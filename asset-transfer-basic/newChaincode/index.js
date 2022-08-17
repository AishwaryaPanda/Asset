/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const transferOwner = require('./lib/transferOwner');

module.exports.AssetTransferLogs = transferOwner;
module.exports.contracts = [transferOwner];
