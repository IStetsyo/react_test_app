import { Transaction } from "../@types";

export const extractTransactionInfo = (tx: Transaction) => {
  const from = tx.x.inputs.map((input) => input.prev_out.addr);
  const to = tx.x.out.map((output) => output.addr);
  const amount = tx.x.out.reduce((sum, output) => sum + output.value, 0);

  return {
    from,
    to,
    amount,
  };
};
