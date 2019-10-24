import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import nem from 'nem-sdk';

const Profiles = () => {

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    axios.get('../../profiles.json')
      .then((response) => {
        setProfiles(profiles.concat(response.data))
      })
  }, [])

  const transfer = async (gwxAddress, amount) => {

    let loadingButton = loading.slice();
    loadingButton.push(gwxAddress);

    loadingButton[gwxAddress] = true

    setLoading(loadingButton);

    const mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair');
    const networkId = -104

    const privateKey = "01c85237e91ece0c0c5e5cfb6021ffad4931b6cea92c43a6fac3901ec0b629f1";
    const mosaicName = "gwx";
    const namespace = "gameworks"

    const common = nem.model.objects.create('common')('', privateKey, false);
    const endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultTestnet, 7890);

    const transferTransaction = nem.model.objects.create('transferTransaction')(gwxAddress, 1, null)


    const mosaicAttachment = nem.model.objects.create('mosaicAttachment')(namespace, mosaicName, (amount * 1000000))
    transferTransaction.mosaics.push(mosaicAttachment)

    const res = await nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId)
    const neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, [mosaicName])

    const fullMosaicName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);

    if (neededDefinition[fullMosaicName] === undefined) return { message: 'Mosaic not found!' }

    mosaicDefinitionMetaDataPair[fullMosaicName] = {}
    mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName]

    const mosaicSupplyRes = await nem.com.requests.mosaic.supply(endpoint, fullMosaicName)

    mosaicDefinitionMetaDataPair[fullMosaicName].supply = mosaicSupplyRes.supply

    const transactionEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitionMetaDataPair, networkId);

    console.log(transactionEntity)
    const response = await nem.model.transactions.send(common, transactionEntity, endpoint);
    console.log(response);

    loadingButton[gwxAddress] = false;
    console.log(loadingButton[gwxAddress])

    setLoading(loadingButton);

    return response;
  }
  let totalAirdrop = 0;

  return (
    <>
      <Table size="small" style={{ marginTop: "5em" }} celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Telegram ID</Table.HeaderCell>
            <Table.HeaderCell>Telegram Username</Table.HeaderCell>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>Email Address</Table.HeaderCell>
            <Table.HeaderCell>GWX Address</Table.HeaderCell>
            <Table.HeaderCell>Tasks</Table.HeaderCell>
            <Table.HeaderCell>Airdrop Reward</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            profiles.map((profile, index) => {
              const fullName = profile.firstName + ' ' + (profile.lastName ? profile.lastName : '');


              const airdropReward = profile.tasks.length * 600


              totalAirdrop += airdropReward
              console.log(loading[profile.gwxAddress]);

              return (
                <Table.Row key={index}>
                  <Table.Cell>{profile.telegramId}</Table.Cell>
                  <Table.Cell>{profile.telegramUsername}</Table.Cell>
                  <Table.Cell>{fullName}</Table.Cell>
                  <Table.Cell>{profile.email}</Table.Cell>
                  <Table.Cell>{profile.gwxAddress}</Table.Cell>
                  <Table.Cell>{profile.tasks.length + '/6'}</Table.Cell>
                  <Table.Cell>{airdropReward}</Table.Cell>
                  <Table.Cell>
                    {
                      loading[profile.gwxAddress]
                        ? <Button size="tiny" loading>Loading</Button> : <Button size="tiny" onClick={() => transfer(profile.gwxAddress, airdropReward)}>Airdrop</Button>
                    }
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </>
  )
}

export default Profiles;