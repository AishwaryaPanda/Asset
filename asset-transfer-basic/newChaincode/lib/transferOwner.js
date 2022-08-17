'use strict';

const { Contract } = require('fabric-contract-api');

class AssetTransferLogs extends Contract {

    async InitLedger(ctx) {
        console.log('Hello............................................................');
        const assetTransferLogs = [

        ];

        for (const assetTransferLog of assetTransferLogs) {
            assetTransferLog.docType = 'assetTransferLog';
            await ctx.stub.putState(assetTransferLog.ID, Buffer.from(JSON.stringify(assetTransferLog)));
            console.info(`Asset ${assetTransferLog.ID} initialized`);
        }
    }

    async CreateAsset(ctx, id, newOwner, transferDate) {
        const assetOwnerLog = {
            ID: id,
            newOwner: newOwner,
            transferDate:transferDate,
        };
        ctx.stub.putState(id,Buffer.from(JSON.stringify(assetOwnerLog)));
        return JSON.stringify(assetOwnerLog);
    }

    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }
    

    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async GetFilterAssets(ctx,query) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        // const iterator = await ctx.stub.getStateByRange('', '');
        const iterator = await ctx.stub.getQueryResult(query);
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}

module.exports = AssetTransferLogs;
