var express=require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

const { Gateway,Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const FabricCAServices = require('fabric-ca-client');


app.set("views", path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set("view engine","html");
app.set("views" , "views");
enrollAdmin();
app.get('/addAssetForm', function (req, res) {

    res.render('createAsset');

});
app.get('/', function (req, res) {

    res.render('login');

});
app.get('/dashboard', function (req, res) {

    res.render('index');

});
app.get('/history', function (req, res) {

    res.render('historyAsset');

});


app.get('/view/', function (req, res) {

    res.render('viewAsset');

});
app.get('/update', function (req, res) {

    res.render('updateAsset');

});

app.get('/transferOwner', function (req, res) {

    res.render('changeOwner');

});

app.get('/register', function (req, res) {

    res.render('userRegistration');

});


app.get('/add/viewAllAssets', async function (req, res)  {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);


        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('basic');


        const result = await contract.evaluateTransaction('GetAllAssets');
	    console.log(JSON.parse(result));
      res.status(200).json({data: result.toString()});

} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});



var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/add/addAsset', urlencodedParser,async function (req, res) {

    console.log(req.body)
    
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('basic');

        await contract.submitTransaction('CreateAsset',req.body.createdBy, req.body.id, req.body.color, req.body.size, req.body.owner, req.body.appraisedValue,req.body.currentValue);
        console.log('Transaction has been submitted');
        //res.send('Transaction has been submitted');
        res.render('createAsset');

        await gateway.disconnect();
} catch (error) {
    console.log("Hello Error")
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})


app.post('/viewOne', urlencodedParser,async function (req, res) {

    console.log(req.body)
    
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('basic');

        const result = await contract.evaluateTransaction('ReadAsset',req.body.id);
	    console.log(JSON.parse(result));
        if(result){
            await contract.submitTransaction('UpdateAsset', req.body.id, req.body.color, req.body.size, req.body.owner, req.body.appraisedValue,req.body.currentValue);
            console.log('Transaction has been updated');
            res.render('viewAsset');
        }
        await gateway.disconnect();
    } catch (error) {
    console.log("Hello Error")
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.post('/view', urlencodedParser,async function (req, res) {

    console.log(req.body)
    
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('basic');

        const result = await contract.evaluateTransaction('ReadAsset',req.body.id);
        console.log(result.toString()+"***************************");
	    res.status(200).json({data: result.toString()});
    } catch (error) {
    console.log("Hello Error")
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.post('/deleteAsset', urlencodedParser,async function (req, res) {

    console.log(req.body)
    
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('basic');

        const result = await contract.evaluateTransaction('ReadAsset',req.body.id);
	    console.log(JSON.parse(result));
        if(result){
            await contract.submitTransaction('DeleteAsset', req.body.id);
            console.log('Transaction has been Deleted');
            res.status(200).json({msg:'Successfully Deleted'});

           // res.render('viewAsset');
        }
        await gateway.disconnect();
    } catch (error) {
    console.log("Hello Error")
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/transfer', urlencodedParser,async function (req, res) {

    console.log(req.body)
    
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('transfer');
        // console.log(contract);
        await contract.submitTransaction('CreateAsset', req.body.id, req.body.ownerName, req.body.date);
        console.log('Transaction has been submitted');
        //res.send('Transaction has been submitted');
       
        const updateData = await changeOwnerInBasic(req.body.id, req.body.ownerName);
        if(updateData){
            return res.redirect('/view');
        }
        await gateway.disconnect();
} catch (error) {
    console.log("Hello Error")
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})


async function changeOwnerInBasic(param1,param2){
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
                const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        
                const walletPath = path.join(process.cwd(), 'wallet');
                const wallet = await Wallets.newFileSystemWallet(walletPath);
                console.log(`Wallet path: ${walletPath}`);
        
                const identity = await wallet.get('admin');
                if (!identity) {
                    console.log('An identity for the user "appUser1" does not exist in the wallet');
                    console.log('Run the registerUser.js application before retrying');
                    return;
                }
        
                const gateway = new Gateway();
                await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
        
        
                const network = await gateway.getNetwork('mychannel');
                const contract= network.getContract('basic');
                await contract.submitTransaction('TransferAsset', param1, param2);
                return true;
            } catch (error) {
                console.log("Hello Error")
                    console.error(`Failed to submit transaction: ${error}`);
                    process.exit(1);
                }
        

}

app.get('/viewTransferOwner/:ID', async function (req, res)  {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('transfer');

        var stringQuery = '{"selector": {"ID": "'+req.params.ID+'"}}';
        const result = await contract.evaluateTransaction('GetFilterAssets',stringQuery);
	    console.log(req.params.ID);
      res.status(200).json({data: result.toString()});

} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

async function enrollAdmin(){
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

app.post('/userRegistrationFunction', urlencodedParser,async function (req, res){
    console.log(req.body);
        const username = req.body.userName;
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log('An identity for the user '+username+' already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: username,
            role: 'client'
        }, adminUser);
        
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
       
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        const testUser = await wallet.get(username);
        if (testUser) {
            console.log('An identity for the user '+username+' already exists in the wallet');
            // return;
        }
        console.log("Successfully registered and enrolled admin user "+username+ "and imported it into the wallet");
       // res.send("Successfully Registered");

        try{
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('user');

        await contract.submitTransaction('UserRegistration', req.body.userName, req.body.phone, req.body.mail, req.body.password);
        console.log('Transaction has been submitted');

        //res.send('Transaction has been submitted');
        res.render('login');

        await gateway.disconnect();
        }
        catch(error) {
            console.log("Hello Error")
                console.error(`Failed to submit transaction: ${error}`);
                process.exit(1);
            }

    } catch (error) {
        console.error(`Failed to register user`+username+`: ${error}`);
        process.exit(1);
    }
});


app.post('/login', urlencodedParser,async function (req, res) {
var user=req.body.name;
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
                const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        
                const walletPath = path.join(process.cwd(), 'wallet');
                const wallet = await Wallets.newFileSystemWallet(walletPath);
                console.log(`Wallet path: ${walletPath}`);
        
                const identity = await wallet.get(user);
                if (identity) {
                    res.status(200).json({status: 1,username:user});
                }else{
                    res.status(200).json({status:0});
                }
        
                
        } catch (error) {
            console.log("Hello Error")
                console.error(`Failed to submit transaction: ${error}`);
                process.exit(1);
            }


});


app.get('/getHistory/:ID', async function (req, res)  {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });


        const network = await gateway.getNetwork('mychannel');


        const contract = network.getContract('basic');

        // var stringQuery = '{"selector": {"ID": "'+req.params.ID+'"}}';
        const result = await contract.evaluateTransaction('GetAssetHistory',req.params.ID);
	    // console.log(req.params.ID);
      res.status(200).json({data: result.toString()});

} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.listen(8088);