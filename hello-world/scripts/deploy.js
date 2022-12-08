async function main() {
    const HelloWorld = await ethers.getContractFactory("CoinFlipBchain")
  
    // Start deployment, returning a promise that resolves to a contract object
    const hello_world = await HelloWorld.deploy();
    console.log("Contract deployed to address:", hello_world.address)
  }
  
  main()