// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract VotingContract {
    using Counters for Counters.Counter;
    Counters.Counter public _candidateId;
    Counters.Counter public _voterId;

    address public votingOrganizer;

    //struct for candidate for voting
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs; // va contenir tous les info sur un candidat
    }

    event CandidateCreate(
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;

    mapping(address => Candidate) public candidates;
    ///// END OF CANDIDATE DATA

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreate(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    address[] public votedVoter; // address de ceux qui on déjà voté
    address[] public votersAddress; // address de ceux qui peuvent voter

    mapping(address => Voter) public voters;
    ///// END OF VOTER DATA

    constructor() {
        votingOrganizer = msg.sender;
    }

    // fonction to create candidate
    function setCandidate(
        address _address,
        string memory _name,
        string memory _age,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only the voting organizer can create a candidate"
        );
        _candidateId.increment();
        uint256 newCandidateId = _candidateId.current();
        candidates[_address] = Candidate(
            newCandidateId,
            _age,
            _name,
            _image,
            0,
            _address,
            _ipfs
        );
        candidateAddress.push(_address);
        emit CandidateCreate(
            newCandidateId,
            _age,
            _name,
            _image,
            0,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidateData(
        address _address
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            string memory
        )
    {
        return (
            candidates[_address].candidateId,
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].image,
            candidates[_address].voteCount,
            candidates[_address]._address,
            candidates[_address].ipfs
        );
    }

    /// ------------------------- voter section ---------------------------
    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only the voting organizer can create a voter"
        );
        require(
            (voters[_address].voter_allowed == 0),
            "You are already a voter"
        );
        _voterId.increment();
        uint256 newVoterId = _voterId.current();
        voters[_address] = Voter(
            newVoterId,
            _name,
            _image,
            _address,
            1,
            false,
            1000,
            _ipfs
        );
        votersAddress.push(_address);
        emit VoterCreate(
            newVoterId,
            _name,
            _image,
            _address,
            1,
            false,
            1000,
            _ipfs
        );
    }

    function vote(
        address _candidateAddress,
        uint256 _candidateVodeId
    ) external {
        Voter storage voter = voters[msg.sender];
        require(!voter.voter_voted, "You have already voted");
        require(voter.voter_allowed == 1, "You are not allowed to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVodeId;
        votedVoter.push(msg.sender);
        candidates[_candidateAddress].voteCount++;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterData(
        address _address
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            address,
            uint256,
            bool,
            string memory
        )
    {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_allowed,
            voters[_address].voter_voted,
            voters[_address].voter_ipfs
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoter;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }

    function getVotedVoterLength() public view returns (uint256) {
        return votedVoter.length;
    }
}
