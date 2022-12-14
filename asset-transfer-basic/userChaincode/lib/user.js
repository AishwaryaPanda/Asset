/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        console.log("Hello**************************************************");
        const users= [
            {
                Name: dilip,
                Mobile_No: 7750066172,
                E_Mail: dilip,
                Password: 123,
            },
            
        ];

        for (const user of users) {
            user.docType = 'user';
            await ctx.stub.putState(user.name, Buffer.from(JSON.stringify(user)));
            console.info(`Asset ${user.name} initialized`);
        }
    }

    // // CreateAsset issues a new asset to the world state with given details.
    // async CreateAsset(ctx, id, color, size, owner, appraisedValue,currentValue) {
    //     const asset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //         CurrentValue: currentValue,
    //     };
    //     ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    //     return JSON.stringify(asset);
    // }
    // CreateAsset issues a new asset to the world state with given details.
    async UserRegistration(ctx, name, phone,mail, password) {
        const user = {
            Name: name,
            Mobile_No: phone,
            E_Mail: mail,
            Password: password,
            
        };
        ctx.stub.putState(name, Buffer.from(JSON.stringify(user)));
        return JSON.stringify(user);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    // async ReadAsset(ctx, id) {
    //     const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
    //     if (!assetJSON || assetJSON.length === 0) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }
    //     return assetJSON.toString();
    // }

    // // UpdateAsset updates an existing asset in the world state with provided parameters.
    // async UpdateAsset(ctx, id, color, size, owner, appraisedValue,currentValue) {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }

    //     // overwriting original asset with new asset
    //     const updatedAsset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //         CurrentValue: currentValue,
    //     };
    //     return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
    // }

   

    // // DeleteAsset deletes an given asset from the world state.
    // async DeleteAsset(ctx, id) {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }
    //     return ctx.stub.deleteState(id);
    // }

    // // AssetExists returns true when asset with given ID exists in world state.
    // async AssetExists(ctx, id) {
    //     const assetJSON = await ctx.stub.getState(id);
    //     return assetJSON && assetJSON.length > 0;
    // }

    // // TransferAsset updates the owner field of asset with given id in the world state.
    // async TransferAsset(ctx, id, newOwner) {
    //     const assetString = await this.ReadAsset(ctx, id);
    //     const asset = JSON.parse(assetString);
    //     asset.Owner = newOwner;
    //     return ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    // }

    // // GetAllAssets returns all assets found in the world state.
    // async GetAllAssets(ctx) {
    //     const allResults = [];
    //     // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    //     const iterator = await ctx.stub.getStateByRange('', '');
    //     let result = await iterator.next();
    //     while (!result.done) {
    //         const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //         let record;
    //         try {
    //             record = JSON.parse(strValue);
    //         } catch (err) {
    //             console.log(err);
    //             record = strValue;
    //         }
    //         allResults.push({ Key: result.value.key, Record: record });
    //         result = await iterator.next();
    //     }
    //     return JSON.stringify(allResults);
    // }

    // // GetAssetHistory returns the chain of custody for an asset since issuance.
	// async GetAssetHistory(ctx, assetName) {

	// 	let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
	// 	let results = await this.GetAllResults(resultsIterator, true);

	// 	return JSON.stringify(results);
	// }

    // async GetAllResults(iterator, isHistory) {
	// 	let allResults = [];
	// 	let res = await iterator.next();
	// 	while (!res.done) {
	// 		if (res.value && res.value.value.toString()) {
	// 			let jsonRes = {};
	// 			console.log(res.value.value.toString('utf8'));
	// 			if (isHistory && isHistory === true) {
	// 				jsonRes.TxId = res.value.tx_id;
	// 				jsonRes.Timestamp = res.value.timestamp;
	// 				try {
	// 					jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
	// 				} catch (err) {
	// 					console.log(err);
	// 					jsonRes.Value = res.value.value.toString('utf8');
	// 				}
	// 			} else {
	// 				jsonRes.Key = res.value.key;
	// 				try {
	// 					jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
	// 				} catch (err) {
	// 					console.log(err);
	// 					jsonRes.Record = res.value.value.toString('utf8');
	// 				}
	// 			}
	// 			allResults.push(jsonRes);
	// 		}
	// 		res = await iterator.next();
	// 	}
	// 	iterator.close();
	// 	return allResults;
	// }


}

module.exports = AssetTransfer;
