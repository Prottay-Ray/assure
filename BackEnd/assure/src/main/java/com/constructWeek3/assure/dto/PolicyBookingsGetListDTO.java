package com.constructWeek3.assure.dto;

import lombok.*;

import java.util.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PolicyBookingsGetListDTO {

    private Long bookingId;
    private String userName;
    private Date bookingDate;
    private Date validTillDate;
    private Float coverAmount;
    private Float premium;
    private Integer coverTenure;
    private String policyName;
    private String roomRentLimit;
    private Float claimBonus;
    private String pedWaitingPeriod; //waiting period of pre-existing-disease cover
    private Float copayPercent;
    private Boolean isCriticalIllnessCovered;
    private Boolean isMaternityCovered;
    private Boolean isRestorationBenefitsCovered;

    List<ProfileMemberDTO> members = new LinkedList<>();

    public void addMember(ProfileMemberDTO memberDTO) {
        members.add(memberDTO);
    }

}
