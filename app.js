require('dotenv').config();
const inquirer = require('inquirer');
const chalk = require('chalk');
const Caver = require('caver-js');

const getTransferPayload = () => {
  const queries = [
    {
      name: 'recipient',
      type: 'input',
      message: 'Enter recipient\'s address :::'
    },
    {
      name: 'amount',
      type: 'input',
      message: 'Enter transfer amount :::'
    }
  ];
  return inquirer.prompt(queries);
}

const getConsent = () => {
  const queries = [
    {
      name: 'consent',
      type: 'confirm',
      message: 'Do you want to proceed transfer?'
    }
  ];
  return inquirer.prompt(queries);
}

const buildCaver = () => {
  const accessKey = process.env.KAS_NODE_ACCESS;
  const secretKey = process.env.KAS_NODE_SECRET;
  const networkId = process.env.BC_NETWORK_ID;
  const option = {
    headers: [
      {name: 'Authorization', value: 'Basic ' + Buffer.from(accessKey + ':' + secretKey).toString('base64')},
      {name: 'x-chain-id', value: networkId},
    ]
  }
  return new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
}
const main = async () => {
  const caver = buildCaver();
  const walletAddr = process.env.WALLET_ADDRESS;
  const walletPvt = process.env.WALLET_PRIVATE;
  let balance = await caver.klay.getBalance(walletAddr);
  console.log('Target Wallet', chalk.green(walletAddr));
  console.log('Current Balance', chalk.green(Caver.utils.convertFromPeb(balance), 'KLAY'));
  const answers = await getTransferPayload();
  const {recipient, amount} = answers;
  console.log('recipient:', chalk.green(recipient))
  console.log('value:', chalk.green(amount, 'KLAY'));
  const {consent} = await getConsent();
  if(!consent) {
    console.log(chalk.red('Cancel Transfer Process. Done.'));
    return;
  }
  console.log(chalk.blue('Value Transfer In Progress...'));
  const signedTx = await caver.klay.accounts.signTransaction({
    from: walletAddr,
    to: recipient,
    value: caver.utils.toPeb(amount, 'KLAY'),
    gas: 900000
  }, walletPvt);
  const result = await caver.klay.sendSignedTransaction(signedTx);
  console.log('Result ::::', chalk.green(JSON.stringify(result)));
  console.log(chalk.blue('Process Finished.'));
}
main()
