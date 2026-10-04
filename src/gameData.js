export const STATES = [
  {name:'Lagos',zone:'South West',city:'Lagos',identity:'coastal megacity',lesson:'wallets',district:'Yaba',color:0x176b68},
  {name:'Oyo',zone:'South West',city:'Ibadan',identity:'heritage city',lesson:'transactions',district:'Dugbe',color:0x73513e},
  {name:'Ogun',zone:'South West',city:'Abeokuta',identity:'granite hills',lesson:'gas',district:'Lafenwa',color:0x596c54},
  {name:'Osun',zone:'South West',city:'Osogbo',identity:'art and culture',lesson:'NFTs',district:'Osogbo Main Park',color:0x79556f},
  {name:'Ondo',zone:'South West',city:'Akure',identity:'forest edge',lesson:'security',district:'Alagbaka',color:0x365d48},
  {name:'Ekiti',zone:'South West',city:'Ado-Ekiti',identity:'rolling hills',lesson:'identity',district:'Fajuyi',color:0x426c73},
  {name:'Kwara',zone:'North Central',city:'Ilorin',identity:'craft markets',lesson:'payments',district:'Taiwo',color:0x74604b},
  {name:'Kogi',zone:'North Central',city:'Lokoja',identity:'river confluence',lesson:'bridges',district:'Ganaja',color:0x3d6470},
  {name:'Benue',zone:'North Central',city:'Makurdi',identity:'food basket',lesson:'stablecoins',district:'Wurukum',color:0x8a6442},
  {name:'Nasarawa',zone:'North Central',city:'Lafia',identity:'mining country',lesson:'DAOs',district:'Shendam Road',color:0x62674b},
  {name:'FCT Abuja',zone:'North Central',city:'Abuja',identity:'capital district',lesson:'security',district:'Wuse',color:0x315b5c},
  {name:'Kaduna',zone:'North West',city:'Kaduna',identity:'rail city',lesson:'smart contracts',district:'Kawo',color:0x5f5146},
  {name:'Kano',zone:'North West',city:'Kano',identity:'ancient trade city',lesson:'DeFi',district:'Sabon Gari',color:0x8a6644},
  {name:'Katsina',zone:'North West',city:'Katsina',identity:'northern gateway',lesson:'payments',district:'Central Market',color:0x846b4d},
  {name:'Jigawa',zone:'North West',city:'Dutse',identity:'savanna roads',lesson:'wallets',district:'GRA',color:0x6d6947},
  {name:'Bauchi',zone:'North East',city:'Bauchi',identity:'highland gateway',lesson:'NFTs',district:'Wunti',color:0x6b5948},
  {name:'Gombe',zone:'North East',city:'Gombe',identity:'savanna city',lesson:'transactions',district:'Pantami',color:0x7a6648},
  {name:'Yobe',zone:'North East',city:'Damaturu',identity:'desert edge',lesson:'security',district:'Gashua Road',color:0x8a744d},
  {name:'Borno',zone:'North East',city:'Maiduguri',identity:'historic trade route',lesson:'payments',district:'Monday Market',color:0x795e46},
  {name:'Adamawa',zone:'North East',city:'Yola',identity:'river plains',lesson:'bridges',district:'Jimeta',color:0x4c6a55},
  {name:'Taraba',zone:'North East',city:'Jalingo',identity:'mountain country',lesson:'identity',district:'Mile Six',color:0x486b5e},
  {name:'Plateau',zone:'North Central',city:'Jos',identity:'cool highlands',lesson:'DAOs',district:'Terminus',color:0x536c62},
  {name:'Niger',zone:'North Central',city:'Minna',identity:'hydropower country',lesson:'gas',district:'Tunga',color:0x51644b},
  {name:'Zamfara',zone:'North West',city:'Gusau',identity:'gold country',lesson:'DeFi',district:'Central Market',color:0x796044},
  {name:'Sokoto',zone:'North West',city:'Sokoto',identity:'historic capital',lesson:'security',district:'Gawon Nama',color:0x8a724c},
  {name:'Kebbi',zone:'North West',city:'Birnin Kebbi',identity:'river agriculture',lesson:'stablecoins',district:'Ahmadu Bello Way',color:0x68714b},
  {name:'Rivers',zone:'South South',city:'Port Harcourt',identity:'oil and waterfronts',lesson:'swaps',district:'Mile 1',color:0x195b60},
  {name:'Bayelsa',zone:'South South',city:'Yenagoa',identity:'creeks and mangroves',lesson:'bridges',district:'Sampou',color:0x28685b},
  {name:'Delta',zone:'South South',city:'Asaba',identity:'river corridor',lesson:'payments',district:'Okpanam',color:0x49665a},
  {name:'Edo',zone:'South South',city:'Benin City',identity:'bronze heritage',lesson:'NFTs',district:'Ring Road',color:0x755a49},
  {name:'Akwa Ibom',zone:'South South',city:'Uyo',identity:'tropical avenues',lesson:'wallets',district:'Itam',color:0x2e6c62},
  {name:'Cross River',zone:'South South',city:'Calabar',identity:'festival city',lesson:'identity',district:'Marian Road',color:0x32685a},
  {name:'Abia',zone:'South East',city:'Umuahia',identity:'enterprise markets',lesson:'payments',district:'Aba Road',color:0x765744},
  {name:'Imo',zone:'South East',city:'Owerri',identity:'green city',lesson:'security',district:'Wetheral Road',color:0x386151},
  {name:'Enugu',zone:'South East',city:'Enugu',identity:'coal city',lesson:'smart contracts',district:'Independence Layout',color:0x52634f},
  {name:'Anambra',zone:'South East',city:'Awka',identity:'commerce corridor',lesson:'swaps',district:'Ifite',color:0x49666c},
  {name:'Ebonyi',zone:'South East',city:'Abakaliki',identity:'rice country',lesson:'stablecoins',district:'Kpirikpiri',color:0x68704a}
];

const generic={
 wallets:{title:'First Key',brief:'Learn what a wallet controls, what an address reveals, and what must never be shared.',steps:['Find the Web3 guide','Inspect the public address','Identify the private secret','Reject the seed-phrase request'],kind:'dialogue'},
 transactions:{title:'Put It Onchain',brief:'Follow a real transaction flow: sender, receiver, network, fee and confirmation.',steps:['Meet the merchant','Inspect the transaction','Choose the right network','Confirm the lesson'],kind:'choice'},
 gas:{title:'Who Paid The Network?',brief:'Understand gas as the network resource used to process a transaction.',steps:['Find the builder','Inspect the network fee','Choose the network','Complete the gas lesson'],kind:'choice'},
 NFTs:{title:'The Story Has A Token',brief:'Learn what an NFT represents, how ownership is recorded and why a screenshot is not ownership.',steps:['Find the artist','Inspect the artwork','Read the token record','Publish the collectible'],kind:'collection'},
 security:{title:'Protect The Bag',brief:'Spot phishing, fake support and dangerous approvals before they become expensive mistakes.',steps:['Find the security guide','Inspect three messages','Reject the phishing attempt','Lock in the lesson'],kind:'choice'},
 identity:{title:'Your Onchain Identity',brief:'Learn how a public wallet can become a portable identity without exposing private credentials.',steps:['Meet the community lead','Inspect the profile','Choose what is public','Save the identity lesson'],kind:'dialogue'},
 payments:{title:'Move Value',brief:'Use a simple payment story to understand stable value, addresses and confirmation.',steps:['Meet the merchant','Read the invoice','Verify the recipient','Complete the payment lesson'],kind:'delivery'},
 bridges:{title:'Cross The Network',brief:'Understand why assets can move between networks and what bridge risk means.',steps:['Find the bridge guide','Compare the networks','Check the destination','Finish the bridge lesson'],kind:'choice'},
 stablecoins:{title:'Keep The Value Steady',brief:'Learn why stablecoins exist and what backing, issuer and network actually mean.',steps:['Meet the merchant','Inspect the token','Check the network','Finish the stablecoin lesson'],kind:'choice'},
 DAOs:{title:'Build Together',brief:'See how communities coordinate proposals, voting and shared treasuries onchain.',steps:['Find the community','Read the proposal','Cast a practice vote','Complete the DAO lesson'],kind:'choice'},
 DeFi:{title:'Use The Protocol',brief:'Explore permissionless finance while learning that protocol risk still matters.',steps:['Find the trader','Read the protocol','Check the risk','Complete the DeFi lesson'],kind:'choice'},
 swaps:{title:'Swap Without Getting Swapped',brief:'Read a quote, verify the token and slippage, then reject a fake route.',steps:['Meet the trader','Read the quote','Spot the fake token','Confirm the safe route'],kind:'choice'},
 'smart contracts':{title:'Read The Machine',brief:'Learn that a smart contract is programmable onchain logic, not a human promise.',steps:['Find the builder','Inspect the contract','Check the action','Complete the lesson'],kind:'choice'}
};

export const MISSIONS=[
 {id:'wallet',state:'Lagos',title:'First Key',district:'Yaba',lesson:'Wallets',brief:'Ada is helping students open their first wallet. Learn the difference between a public address and the recovery secret.',steps:['Find Ada at the Web3 Hub','Inspect the public address','Identify the recovery secret','Reject the seed-phrase request'],reward:100,kind:'dialogue'},
 {id:'transaction',state:'Oyo',title:'Send It Onchain',district:'Dugbe',lesson:'Transactions',brief:'A community merchant needs a tiny payment. Learn what a signed transaction actually does before it is broadcast.',steps:['Meet the merchant','Inspect sender and receiver','Choose the correct network','Confirm the transaction lesson'],reward:150,kind:'choice'},
 {id:'gas',state:'Ogun',title:'Who Paid The Network?',district:'Lafenwa',lesson:'Gas',brief:'A builder is waiting on a transaction. Learn why networks charge fees and why gas is separate from the asset being sent.',steps:['Find the builder','Inspect the network fee','Choose the correct network','Complete the gas lesson'],reward:180,kind:'choice'},
 {id:'nft',state:'Osun',title:'The Story Has A Token',district:'Osogbo Main Park',lesson:'NFTs',brief:'Help an artist publish a digital collectible and understand ownership without confusing it with a screenshot.',steps:['Find the artist','Inspect the artwork','Learn what the token proves','Publish the collectible'],reward:220,kind:'collection'},
 {id:'security',state:'FCT Abuja',title:'Protect The Bag',district:'Wuse',lesson:'Security',brief:'Three messages look legitimate. One is a phishing trap. Learn to inspect links, approvals and recovery phrases.',steps:['Find the security office','Inspect three messages','Reject the phishing attempt','Lock in the lesson'],reward:250,kind:'choice'},
 {id:'swap',state:'Rivers',title:'Swap Without Getting Swapped',district:'Mile 1',lesson:'DEXs',brief:'Read a quote, compare the token and slippage, then spot the fake pool before you click.',steps:['Meet the trader','Read the quote','Spot the fake token','Confirm the safe route'],reward:200,kind:'choice'}
];

export const NPC_TYPES=[
 {role:'trader',name:'Tunde',color:0xd39a61,lines:['Check the quote before you swap.','If the token address is wrong, the logo means nothing.']},
 {role:'student',name:'Zainab',color:0x7fb4c9,lines:['I want to learn without risking my savings.','A public address is not a password.']},
 {role:'vendor',name:'Mama Efe',color:0x9d6f54,lines:['Show me who receives the payment.','A confirmation is not the same thing as trust.']},
 {role:'builder',name:'Ada',color:0x16e4d1,lines:['Never send your recovery phrase to support.','The chain records the transaction; you protect the key.']},
 {role:'artist',name:'Seyi',color:0xc58fbd,lines:['The image can be copied. The token record is what we inspect.','Creators still need to explain what buyers actually receive.']}
];

export const BUS_STOPS=[
 ['Yaba Tech Gate','Lagos'],['Ojuelegba','Lagos'],['Dugbe','Oyo'],['Challenge','Oyo'],['Mile 1','Rivers'],['Rumuola','Rivers'],
 ['Wuse Market','FCT Abuja'],['Area 1','FCT Abuja'],['Osogbo Main Park','Osun'],['Lafenwa','Ogun'],['Kawo','Kaduna'],['Sabon Gari','Kano'],
 ['Terminus','Plateau'],['Ring Road','Edo'],['Marian Road','Cross River']
];

export const CITY_STYLES={
 'Lagos':{road:0x111918,ground:0x30443d,accent:0x16e4d1,weather:'coastal'},
 'Ibadan':{road:0x171513,ground:0x4c463b,accent:0xd7a15b,weather:'hazy'},
 'Abeokuta':{road:0x151a17,ground:0x445040,accent:0xb6c777,weather:'warm'},
 'Osogbo':{road:0x18151b,ground:0x4a3d49,accent:0xe0a5d1,weather:'humid'},
 'Port Harcourt':{road:0x101a1c,ground:0x304c47,accent:0x34d8c6,weather:'humid'},
 'Abuja':{road:0x12191a,ground:0x394b47,accent:0x74d8cc,weather:'dry'},
 'default':{road:0x141817,ground:0x3b453e,accent:0x16e4d1,weather:'day'}
};

export const OBJECTIVE_TEMPLATES=[
 {type:'talk',label:'TALK',hint:'Get close and press E to speak.'},
 {type:'inspect',label:'INSPECT',hint:'Approach the marked object and press E.'},
 {type:'choice',label:'CHOOSE',hint:'Read the options and pick the safe answer.'},
 {type:'collect',label:'COLLECT',hint:'Pick up the marked item.'},
 {type:'deliver',label:'DELIVER',hint:'Enter the destination zone and confirm delivery.'}
];
