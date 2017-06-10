const DiscoveryV1 = require('watson-developer-cloud/discovery/v1')

discovery.createEnvironment({name:"myenv", description:"testenv"}, (err, result)=>{
    console.log(err)
    console.log(result)
    const {environment_id}=result
    discovery.getConfigurations({
        environment_id
    }, (err, result)=>{
        console.log(err)
        console.log(result)
        const {configuration_id}=result
        discovery.createCollection({
            environment_id,
            configuration_id,
            name:"mycollection",
            description:"testcollection"
        })
    })
})
