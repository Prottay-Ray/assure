package com.constructWeek3.assure.dto;

import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LatestClaimDTO {

    private Long id;
    private Long bookingId;
    private String userName;
    private Boolean isBookingThere;
    private String policyName;
    private Boolean isClaimThere;
    private String status;
    private String claimItem;
    private Date submissionDate;
    private Long memberId;
    private Date validTillDate;
    private Float coverAmount;
    private Integer memberCount;


}
