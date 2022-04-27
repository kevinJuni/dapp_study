import React, { useEffect, useState } from "react";
import Web3 from "web3";

function App(){

    const [account, setAccount] = useState("");

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
        setAccount(account[0]);
        const networkId = web3.eth.net.getId();
        console.log(networkId)
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