import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Tether from '../truffle_abis/Tether.json'
function App(){

    const [account, setAccount] = useState("");
    const [tether, setTether] = useState();

    const UNSAFE_componentWillMount = async function(){
        await loadWeb3();
        await loadBlockChainData();
    } 
    const loadWeb3 = async function(){
        if(window.ethereum){
            window.web3 =  new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3){
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("메타마스크;;");
        }
    }

    const loadBlockChainData =  async function(){
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        setAccount(account)
        const networkId = await web3.eth.net.getId();
        const tetherData = Tether.networks[networkId];
        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            setTether(tether);
            console.log("111")
            console.log(tether)
            let ththerBalance = await tether.methods.balanceOf(account[0]).call();
            console.log("111")
            console.log(ththerBalance)
            console.log(ththerBalance.toString())
            console.log(ththerBalance.toString())
        }
        
    }

    useEffect(()=>{
        UNSAFE_componentWillMount();
    },[])
    return(
        <>
            <div>
                {account}
            </div>
        </>
    )
}

export default App;