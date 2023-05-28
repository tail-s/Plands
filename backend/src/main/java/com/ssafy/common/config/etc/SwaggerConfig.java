package com.ssafy.common.config.etc;

import com.fasterxml.classmate.TypeResolver;
import com.ssafy.common.db.dto.request.MemberRegistReqDto;
import com.ssafy.common.db.dto.response.MemberDto;
import com.ssafy.common.db.dto.response.PlanDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api(TypeResolver typeResolver) {
        return new Docket(DocumentationType.OAS_30)
                .additionalModels(typeResolver.resolve(MemberRegistReqDto.class))
                .additionalModels(typeResolver.resolve(MemberDto.class))
                .additionalModels(typeResolver.resolve(PlanDto.class))
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.api.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("Team Baekgu Swagger")
                .description("API 상세소개 및 사용법")
                // .contact(new Contact("이름", "url", "email"))
                .version("1.0")
                .build();
    }
}