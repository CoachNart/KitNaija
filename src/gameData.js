export const STATES = [
  {name:'Lagos',zone:'South West',city:'Lagos',identity:'coastal megacity',lesson:'wallets'},
  {name:'Oyo',zone:'South West',city:'Ibadan',identity:'heritage city',lesson:'transactions'},
  {name:'Ogun',zone:'South West',city:'Abeokuta',identity:'granite hills',lesson:'gas'},
  {name:'Osun',zone:'South West',city:'Osogbo',identity:'art and culture',lesson:'NFTs'},
  {name:'Ondo',zone:'South West',city:'Akure',identity:'forest edge',lesson:'security'},
  {name:'Ekiti',zone:'South West',city:'Ado-Ekiti',identity:'rolling hills',lesson:'identity'},
  {name:'Kwara',zone:'North Central',city:'Ilorin',identity:'craft markets',lesson:'payments'},
  {name:'Kogi',zone:'North Central',city:'Lokoja',identity:'river confluence',lesson:'bridges'},
  {name:'Benue',zone:'North Central',city:'Makurdi',identity:'food basket',lesson:'stablecoins'},
  {name:'Nasarawa',zone:'North Central',city:'Lafia',identity:'mining country',lesson:'DAOs'},
  {name:'FCT Abuja',zone:'North Central',city:'Abuja',identity:'capital district',lesson:'security'},
  {name:'Kaduna',zone:'North West',city:'Kaduna',identity:'rail city',lesson:'smart contracts'},
  {name:'Kano',zone:'North West',city:'Kano',identity:'ancient trade city',lesson:'DeFi'},
  {name:'Katsina',zone:'North West',city:'Katsina',identity:'northern gateway',lesson:'payments'},
  {name:'Jigawa',zone:'North West',city:'Dutse',identity:'savanna roads',lesson:'wallets'},
  {name:'Bauchi',zone:'North East',city:'Bauchi',identity:'highland gateway',lesson:'NFTs'},
  {name:'Gombe',zone:'North East',city:'Gombe',identity:'savanna city',lesson:'transactions'},
  {name:'Yobe',zone:'North East',city:'Damaturu',identity:'desert edge',lesson:'security'},
  {name:'Borno',zone:'North East',city:'Maiduguri',identity:'historic trade route',lesson:'payments'},
  {name:'Adamawa',zone:'North East',city:'Yola',identity:'river plains',lesson:'bridges'},
  {name:'Taraba',zone:'North East',city:'Jalingo',identity:'mountain country',lesson:'identity'},
  {name:'Plateau',zone:'North Central',city:'Jos',identity:'cool highlands',lesson:'DAOs'},
  {name:'Niger',zone:'North Central',city:'Minna',identity:'hydropower country',lesson:'gas'},
  {name:'Zamfara',zone:'North West',city:'Gusau',identity:'gold country',lesson:'DeFi'},
  {name:'Sokoto',zone:'North West',city:'Sokoto',identity:'historic capital',lesson:'security'},
  {name:'Kebbi',zone:'North West',city:'Birnin Kebbi',identity:'river agriculture',lesson:'stablecoins'},
  {name:'Rivers',zone:'South South',city:'Port Harcourt',identity:'oil and waterfronts',lesson:'swaps'},
  {name:'Bayelsa',zone:'South South',city:'Yenagoa',identity:'creeks and mangroves',lesson:'bridges'},
  {name:'Delta',zone:'South South',city:'Asaba',identity:'river corridor',lesson:'payments'},
  {name:'Edo',zone:'South South',city:'Benin City',identity:'bronze heritage',lesson:'NFTs'},
  {name:'Akwa Ibom',zone:'South South',city:'Uyo',identity:'tropical avenues',lesson:'wallets'},
  {name:'Cross River',zone:'South South',city:'Calabar',identity:'festival city',lesson:'identity'},
  {name:'Abia',zone:'South East',city:'Umuahia',identity:'enterprise markets',lesson:'payments'},
  {name:'Imo',zone:'South East',city:'Owerri',identity:'green city',lesson:'security'},
  {name:'Enugu',zone:'South East',city:'Enugu',identity:'coal city',lesson:'smart contracts'},
  {name:'Anambra',zone:'South East',city:'Awka',identity:'commerce corridor',lesson:'swaps'},
  {name:'Ebonyi',zone:'South East',city:'Abakaliki',identity:'rice country',lesson:'stablecoins'}
];

export const MISSIONS = [
  {id:'wallet',state:'Lagos',title:'First Key',district:'Yaba',lesson:'Wallets',brief:'Find Ada at the Web3 Hub and learn the difference between an address and a recovery phrase.',steps:['Find the Web3 Hub','Talk to Ada','Identify the public address','Reject the seed-phrase request'],reward:100,kind:'talk'},
  {id:'transaction',state:'Oyo',title:'Send It Onchain',district:'Ibadan',lesson:'Transactions',brief:'A community merchant needs a tiny payment. Learn what a signed transaction actually does.',steps:['Meet the merchant','Inspect the transaction','Choose the right network','Approve the lesson'],reward:150,kind:'delivery'},
  {id:'swap',state:'Rivers',title:'Swap Without Getting Swapped',district:'Port Harcourt',lesson:'DEXs',brief:'Read a quote, compare the token and slippage, then spot the fake pool before you click.',steps:['Meet the trader','Read the quote','Spot the fake token','Confirm the safe route'],reward:200,kind:'trade'},
  {id:'security',state:'FCT Abuja',title:'Protect The Bag',district:'Wuse',lesson:'Security',brief:'Three messages look legitimate. One is a phishing trap. Learn to inspect links, approvals and recovery phrases.',steps:['Find the security office','Inspect three messages','Reject the phishing attempt','Lock in the lesson'],reward:250,kind:'security'},
  {id:'nft',state:'Osun',title:'The Story Has A Token',district:'Osogbo',lesson:'NFTs',brief:'Help an artist publish a digital collectible and understand ownership without confusing it with a screenshot.',steps:['Find the artist','Inspect the artwork','Learn what the token proves','Publish the collectible'],reward:220,kind:'talk'},
  {id:'gas',state:'Ogun',title:'Who Paid The Network?',district:'Abeokuta',lesson:'Gas',brief:'A transaction is waiting. Learn why networks charge fees and why the fee is not the same as the asset being sent.',steps:['Find the builder','Inspect the fee','Choose the network','Complete the gas lesson'],reward:180,kind:'delivery'}
];

export const NPC_TYPES = [
  {role:'trader',name:'Tunde',color:0xd39a61},
  {role:'student',name:'Zainab',color:0x7fb4c9},
  {role:'vendor',name:'Mama Efe',color:0x9d6f54},
  {role:'builder',name:'Ada',color:0x16e4d1},
  {role:'artist',name:'Seyi',color:0xc58fbd}
];

export const BUS_STOPS = [
  ['Yaba Tech Gate','Lagos'],['Ojuelegba','Lagos'],['Dugbe','Oyo'],['Challenge','Oyo'],
  ['Mile 1','Rivers'],['Rumuola','Rivers'],['Wuse Market','FCT Abuja'],['Area 1','FCT Abuja'],
  ['Osogbo Main Park','Osun'],['Lafenwa','Ogun']
];
