
var neo4j = require('neo4j-driver');
var axios = require('axios');
var cheerio = require('cheerio');

var driver = neo4j.driver('bolt://18.203.12.204', neo4j.auth.basic('neo4j', 'A4sJ2eG4aM4s'));


async function init() {
  let session = driver.session();
  let result = await session.run(`MATCH (c: Clothing) RETURN c`)
  let nodes = result.records.map(record => (record._fields[0].properties))
  session.close()
  
  
  console.log("Nodos totales: ", nodes.length);
  for(let i = 108; i < nodes.length; i+=1) {
    console.log(i);
    const url = `http://www.amazon.es/dp/${nodes[i].code}`;
    
    try {
      const {
        data
      } = await axios.get(url);
  
      const $ = cheerio.load(data);

      let featureDetails = [];
      $('#feature-bullets>ul>li>span').each((i, el) => {
        featureDetails.push($(el).text().replace(/[\n\t]/g, '').trim());
      })
      let description = featureDetails.join('\n')
      
      let session2 = driver.session();
      session2.run(`MATCH (n:Clothing { code: $codeParam })
                    SET n.description = $descriptionParam`, {
                      codeParam: nodes[i].code,
                      descriptionParam: description
                    })
      session2.close()

    }
    catch (err) {
      console.log("FAIL:", nodes[i].code, err);
    }

  }

}

init();
