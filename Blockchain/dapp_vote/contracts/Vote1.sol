// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Vote1 {
    // attribute
    address administrator;
    bool private is_vote_live;

    vote_paper[] private ballot_box;
    // struct
    struct vote_paper {
        string user_address;
        bool pros_and_cons;
    }
    // mapping
    // 중복투표 불가능 하도록 설정하기 위한 사전 작업이다.
    mapping(address => bool) has_user_voted;

    // modifier
    // onlyAdministrator 태그를 붙이면 관리자만 실행이 가능하다.
    modifier onlyAdministrator {
        require(msg.sender == administrator);
        _;
    }

    // constructor
    constructor() {
        administrator = msg.sender;
        is_vote_live = true;
    }

    // function
    // 투표권을 행사하는 함수
    function makeVote(string memory _user_address, bool _pros_and_cons) public {
        // 투표가 진행중인 법안이어야 한다.
        require(is_vote_live == true);
        // 관리자는 투표할 수 없어야 한다.
        if(msg.sender == administrator){
            revert();
        }
        // 유권자는 중복투표가 불가능하다.
        require(has_user_voted[msg.sender] == false);

        // 유권자가 투표권을 행사한다.
        ballot_box.push(vote_paper(_user_address, _pros_and_cons));
        // 유권자가 투표를 완료하여 더 이상 투표가 불가능하다.
        has_user_voted[msg.sender] = true;
    }

    // 투표를 종료하는 함수
    function finishVote() public onlyAdministrator {
        // 투표가 진행중인 법안이어야 한다.
        require(is_vote_live == true);
        // 투표를 종료시킨다.
        is_vote_live = false;
    }

    // 투표 결과를 확인하는 함수
    function resultVote() public view returns (vote_paper[] memory){
        return ballot_box;
    }

    function voter_list() public view returns (string[] memory){
        string[] memory voters = new string[](ballot_box.length);

        for(uint i=0; i<ballot_box.length; i++) {
            voters[i] = ballot_box[i].user_address;
        }
        return voters;
    }
}