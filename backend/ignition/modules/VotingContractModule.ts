import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("VotingContractModule", (m) => {
  const votingContract = m.contract("VotingContract");

  return { votingContract };
});
