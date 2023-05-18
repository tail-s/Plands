import { OpenVidu } from "openvidu-browser";
import Loading from "components/loading/Loading";
import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import UserVideoComponent from "./UserVideoComponent";

import {
  VideoContainer,
  SessionsComponent,
  OpenViduWrapper,
  MainVideo,
} from "./VideoSpace.style";

const APPLICATION_SERVER_URL = "https://i8b109.p.ssafy.io:8443/openvidu/";

const VideoSpace = ({ mySessionId, myUserName }) => {
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [loadOV, setLoadOV] = useState(true);
  const [OV, setOV] = useState(new OpenVidu());

  useEffect(() => {
    setOV(new OpenVidu());
    const temp = OV.initSession();
    setSession(temp);
    joinSessionNext(temp);
    window.addEventListener("beforeunload", onbeforeunload);

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      console.log("오픈비두 종료");
      leaveSession(temp);
    };
  }, []);

  const onbeforeunload = () => {
    leaveSession();
  };

  const joinSessionNext = (session) => {
    const mySession = session;
    console.log(session);
    if (!mySession) {
      return;
    }

    // --- 4) Connect to the session with a valid user token ---
    connect(mySession);
    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);

          // Obtain the current video device in use
          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // Set the main video in the page to display our webcam and store our Publisher
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
    setLoadOV(false);
  };

  const addSubs = (mySession, event) => {
    const subscriber = mySession.subscribe(event.stream, undefined);
    console.log("subscriber : ", subscriber);
    setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    return subscriber;
  };

  const connect = (mySession) => {
    // --- 3) Specify the actions when events take place in the session ---
    if (!mySession) return;
    // On every new Stream received...
    mySession.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      console.log("------created before", subscribers);
      const temp = addSubs(mySession, event);
      console.log(temp);
      console.log("------created after", subscribers);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      console.log("event", event);
      console.log("------destroyed before", subscribers);
      deleteSubscriber(event);
      // setSubscribers([...subscribers]);
      console.log("------destroyed after", subscribers);
    });
  };

  // const deleteSubscriber = (event) => {
  //   console.log(event.stream.streamManager, 0);
  //   console.log(subscribers);
  //   const index = subscribers.indexOf(event.stream.streamManager, 0);
  //   console.log(index);
  //   if (index > -1) {
  //     setSubscribers((prev) => prev.splice(index, 1));
  //   }
  // };

  const deleteSubscriber = (event) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((s) => s !== event.stream.streamManager)
    );
  };

  // const joinSession = useCallback(() => {
  //   const temp = OV.initSession();
  //   setSession(temp);
  //   joinSessionNext(temp);
  // }, [OV, joinSessionNext]);

  const leaveSession = (session) => {
    if (session) {
      session.disconnect();
      setOV(null);
      setSession(undefined);
      setSubscribers([]);
      setMainStreamManager(undefined);
      setPublisher(undefined);
    }
  };

  async function getToken() {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  }

  const createSession = async (sessionId) => {
    const response = await axios
      .post(
        APPLICATION_SERVER_URL + "api/sessions",
        {
          customSessionId: sessionId,
        },
        {
          headers: {
            Authorization:
              // "Basic " + Buffer.from("OPENVIDUAPP:ov109").toString("base64"),
              "Basic " + btoa("OPENVIDUAPP:ov109"),
            "Content-Type": "application/json",
          },
        }
      )
      .catch(async () => {
        return await axios.get(
          APPLICATION_SERVER_URL + "api/sessions/" + sessionId,
          {
            headers: {
              Authorization:
                // "Basic " + Buffer.from("OPENVIDUAPP:ov109").toString("base64"),
                "Basic " + btoa("OPENVIDUAPP:ov109"),
              "Content-Type": "application/json",
            },
          }
        );
      });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId.id + "/connection",
      {
        customSessionId: sessionId.id,
      },
      {
        headers: {
          Authorization:
            // "Basic " + Buffer.from("OPENVIDUAPP:ov109").toString("base64"),
            "Basic " + btoa("OPENVIDUAPP:ov109"),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.token; // The token
  };
  return (
    <OpenViduWrapper>
      {loadOV ? (
        <Loading />
      ) : (
        <SessionsComponent>
          {mainStreamManager !== undefined ? (
            <MainVideo>
              <UserVideoComponent streamManager={mainStreamManager} />
            </MainVideo>
          ) : null}
          <VideoContainer>
            {subscribers.map((sub) => console.log(sub))}
            {subscribers.map((sub, i) => (
              <div key={sub.id}>
                <span>{sub.id}</span>
                <UserVideoComponent key={sub.id} streamManager={sub} />
              </div>
            ))}
          </VideoContainer>
        </SessionsComponent>
      )}
    </OpenViduWrapper>
  );
};

export default VideoSpace;
/*

 <OpenViduWrapper>
      {loadOV ? <Loading /> : null}
      {session !== undefined ? (
        <SessionsComponent>
          {mainStreamManager !== undefined ? (
            <MainVideo>
              <UserVideoComponent streamManager={mainStreamManager} />
            </MainVideo>
          ) : null}
          <VideoContainer>
            {subscribers.map((sub) => console.log(sub))}
            {subscribers.map((sub, i) => (
              <div key={sub.id}>
                <span>{sub.id}</span>
                <UserVideoComponent key={sub.id} streamManager={sub} />
              </div>
            ))}
          </VideoContainer>
        </SessionsComponent>
      ) : null}
    </OpenViduWrapper>
    */
