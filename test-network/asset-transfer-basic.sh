docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
./network.sh down
./network.sh up createChannel -c mychannel -ca -s couchdb
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript
./network.sh deployCC -ccn transfer -ccp ../asset-transfer-basic/newChaincode/ -ccl javascript
./network.sh deployCC -ccn user -ccp ../asset-transfer-basic/userChaincode/ -ccl javascript
 cd ../asset-transfer-basic/application-javascript/
rm -r wallet/
node app.js
cd ../uiPage/
rm -r wallet/
nodemon uipage.js
