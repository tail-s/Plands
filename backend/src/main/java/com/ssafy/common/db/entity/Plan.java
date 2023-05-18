package com.ssafy.common.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Plan {

    @Id @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "code", columnDefinition = "BINARY(16)")
    private UUID code;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @UpdateTimestamp
    @Column(name = "update_date")
    private Timestamp updateDate;

    @CreationTimestamp
    @Column(name = "regist_date", updatable = false)
    private Timestamp registDate;

    @ManyToOne
    @JoinColumn(name = "leader")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<Planner> planners = new ArrayList<>();
}

