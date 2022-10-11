export const drop = {"id":"cl81yyumd9047500wmc8q06sl12","mintPrice":0.01,"maxSupply":0,"startsAt":"2022-09-14T18:00:00.000Z","startTime":1663178400,"endsAt":null,"endTime":0,"groups":[{"name":"Private Group","mintPrice":0.01,"startTime":1663138800}],"chainId":5,"address":"0x0f38e5907638525cc029165af9aCB3c0Ea6550b3","abi":[{"type":"constructor","inputs":[{"name":"_name","type":"string","internalType":"string"},{"name":"_symbol","type":"string","internalType":"string"},{"name":"_baseTokenURI","type":"string","internalType":"string"},{"name":"_maxSupply","type":"uint256","internalType":"uint256"},{"name":"_endTime","type":"uint64","internalType":"uint64"},{"name":"_mintConfig","type":"tuple","components":[{"name":"mintPrice","type":"uint256","internalType":"uint256"},{"name":"startTime","type":"uint64","internalType":"uint64"},{"name":"maxPerWallet","type":"uint256","internalType":"uint256"}],"internalType":"struct MintingConfig"},{"name":"_accessLists","type":"tuple[]","components":[{"name":"signer","type":"address","internalType":"address"},{"name":"mintPrice","type":"uint256","internalType":"uint256"},{"name":"startTime","type":"uint64","internalType":"uint64"},{"name":"maxPerWallet","type":"uint256","internalType":"uint256"}],"internalType":"struct AccessListMintable.AccessListConfig[]"},{"name":"_payouts","type":"tuple","components":[{"name":"payees","type":"address[]","internalType":"address[]"},{"name":"shares","type":"uint96[]","internalType":"uint96[]"}],"internalType":"struct Payouts.PayoutsConfig"},{"name":"_royalties","type":"tuple","components":[{"name":"beneficiary","type":"address","internalType":"address"},{"name":"bips","type":"uint96","internalType":"uint96"}],"internalType":"struct Royalties.RoyaltyConfig"}],"stateMutability":"nonpayable"},{"name":"ApprovalCallerNotOwnerNorApproved","type":"error","inputs":[]},{"name":"ApprovalQueryForNonexistentToken","type":"error","inputs":[]},{"name":"BalanceQueryForZeroAddress","type":"error","inputs":[]},{"name":"ContractsCannotMint","type":"error","inputs":[]},{"name":"ExceedsMaxPerWallet","type":"error","inputs":[]},{"name":"InsufficientPayment","type":"error","inputs":[]},{"name":"InvalidSignature","type":"error","inputs":[]},{"name":"MintERC2309QuantityExceedsLimit","type":"error","inputs":[]},{"name":"MintNotStarted","type":"error","inputs":[]},{"name":"MintToZeroAddress","type":"error","inputs":[]},{"name":"MintZeroQuantity","type":"error","inputs":[]},{"name":"OwnerQueryForNonexistentToken","type":"error","inputs":[]},{"name":"OwnershipNotInitializedForExtraData","type":"error","inputs":[]},{"name":"TransferCallerNotOwnerNorApproved","type":"error","inputs":[]},{"name":"TransferFromIncorrectOwner","type":"error","inputs":[]},{"name":"TransferToNonERC721ReceiverImplementer","type":"error","inputs":[]},{"name":"TransferToZeroAddress","type":"error","inputs":[]},{"name":"URIQueryForNonexistentToken","type":"error","inputs":[]},{"name":"WithdrawFailed","type":"error","inputs":[]},{"name":"Approval","type":"event","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"name":"ApprovalForAll","type":"event","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"name":"ConsecutiveTransfer","type":"event","inputs":[{"name":"fromTokenId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"toTokenId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"name":"OwnershipTransferred","type":"event","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"name":"Paused","type":"event","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"name":"Transfer","type":"event","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"name":"Unpaused","type":"event","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"name":"__mintdrop","type":"function","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"pure"},{"name":"accessLists","type":"function","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"mintPrice","type":"uint256","internalType":"uint256"},{"name":"startTime","type":"uint64","internalType":"uint64"},{"name":"maxPerWallet","type":"uint256","internalType":"uint256"},{"name":"exists","type":"bool","internalType":"bool"},{"name":"mintCount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"airdrop","type":"function","inputs":[{"name":"recipients","type":"address[]","internalType":"address[]"},{"name":"counts","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"approve","type":"function","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"name":"balanceOf","type":"function","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"baseTokenURI","type":"function","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"name":"canPublicMint","type":"function","inputs":[{"name":"count","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"name":"canSignatureMint","type":"function","inputs":[{"name":"signature","type":"bytes","internalType":"bytes"},{"name":"count","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"name":"getApproved","type":"function","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"name":"isApprovedForAll","type":"function","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"name":"maxSupply","type":"function","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"mintConfig","type":"function","inputs":[],"outputs":[{"name":"mintPrice","type":"uint256","internalType":"uint256"},{"name":"startTime","type":"uint64","internalType":"uint64"},{"name":"maxPerWallet","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"name","type":"function","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"name":"owner","type":"function","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"name":"ownerMint","type":"function","inputs":[{"name":"recipient","type":"address","internalType":"address"},{"name":"count","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"ownerOf","type":"function","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"name":"pause","type":"function","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"name":"paused","type":"function","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"name":"publicMint","type":"function","inputs":[{"name":"count","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"name":"removeAccessList","type":"function","inputs":[{"name":"signer","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"renounceOwnership","type":"function","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"name":"royaltyInfo","type":"function","inputs":[{"name":"_tokenId","type":"uint256","internalType":"uint256"},{"name":"_salePrice","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"safeTransferFrom","type":"function","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"name":"safeTransferFrom","type":"function","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"_data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"name":"setAccessList","type":"function","inputs":[{"name":"_signer","type":"address","internalType":"address"},{"name":"_mintPrice","type":"uint256","internalType":"uint256"},{"name":"_startTime","type":"uint64","internalType":"uint64"},{"name":"_maxPerWallet","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"setApprovalForAll","type":"function","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"setBaseTokenURI","type":"function","inputs":[{"name":"_uri","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"setPublicMinting","type":"function","inputs":[{"name":"_config","type":"tuple","components":[{"name":"mintPrice","type":"uint256","internalType":"uint256"},{"name":"startTime","type":"uint64","internalType":"uint64"},{"name":"maxPerWallet","type":"uint256","internalType":"uint256"}],"internalType":"struct MintingConfig"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"setRoyaltyInfo","type":"function","inputs":[{"name":"_beneficiary","type":"address","internalType":"address"},{"name":"_bips","type":"uint96","internalType":"uint96"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"signatureMint","type":"function","inputs":[{"name":"signature","type":"bytes","internalType":"bytes"},{"name":"count","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"name":"supportsInterface","type":"function","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"name":"symbol","type":"function","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"name":"tokenURI","type":"function","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"name":"totalSupply","type":"function","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"name":"transferFrom","type":"function","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"name":"transferOwnership","type":"function","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"name":"unpause","type":"function","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"name":"withdraw","type":"function","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"name":"withdrawAddresses","type":"function","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"name":"withdrawShares","type":"function","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint96","internalType":"uint96"}],"stateMutability":"view"}]}

export const cbUSD = {
  data: {
    currency: "USD",
    rates: {
      AED: "3.6730203797535771",
      AFN: "88.4999999999999027",
      ALL: "119.5823228627051435",
      AMD: "403.8025999999982604",
      ANG: "1.8031989999999999",
      AOA: "433.2943368430174618",
      ARS: "147.3014399999993081",
      AWG: "1.7999444537141584",
      AZN: "1.6999999999999999",
      BAM: "2.004559571200653",
      BBD: "2.0188813862770172",
      BDT: "101.3161987378027961",
      BGN: "1.9952978810136033",
      BHD: "0.3772738",
      BIF: "2066.115702479338843",
      BMD: "1",
      BND: "1.4356399041853928",
      BOB: "6.9069636145300965",
      BRL: "5.4124710000000006",
      BSD: "1.0005071570779228",
      BTN: "81.4716385005633764",
      BWP: "13.3315230000000083",
      BYN: "2.503729",
      BYR: "25037.2899999999999804",
      BZD: "2.0154967514223361",
      CAD: "1.38327",
      CDF: "2045.000000000104295",
      CHF: "0.9886996",
      CLF: "0.03508165",
      CLP: "961.5384615384615385",
      CNY: "7.1159999999999996",
      COP: "4508.5662759242560866",
      CRC: "627.7423899999940224",
      CUC: "1",
      CVE: "112.9943502824858757",
      CZK: "25.0829000000000187",
      DJF: "177.5000000000002663",
      DKK: "7.5872988920039809",
      DOP: "53.6000000000001372",
      DZD: "140.8240000000002155",
      EGP: "19.5380489999999848",
      ETB: "52.5999999999999001",
      EUR: "1.0202207757758779",
      FJD: "2.3099729617664825",
      FKP: "0.895359",
      GBP: "0.896861",
      GEL: "2.8245667255871286",
      GHS: "10.4550967708074461",
      GIP: "0.895359",
      GMD: "55.3999999999999612",
      GNF: "8755.0000000028585075",
      GTQ: "7.8807580000000002",
      GYD: "208.8240698975926761",
      HKD: "7.8498999999999975",
      HNL: "24.7590878851059479",
      HRK: "7.6736999999999989",
      HTG: "121.0653359999995681",
      HUF: "431.5739999999982971",
      IDR: "15303.6999999935984623",
      ILS: "3.5571542197097647",
      INR: "81.6383999999999074",
      IQD: "1460.00000000003212",
      ISK: "144.1600000000003575",
      JMD: "152.1245717693304693",
      JOD: "0.7097",
      JPY: "144.7498505457793115",
      KES: "120.7952677245916214",
      KGS: "80.2218520000000164",
      KHR: "4130.00000000045843",
      KMF: "501.4491881537643791",
      KRW: "1440.0921658986175115",
      KWD: "0.30996",
      KYD: "0.8332948628871634",
      KZT: "476.3910699999920299",
      LAK: "16393.4426229508196721",
      LBP: "1516.9433000001022194",
      LKR: "365.6611900000053227",
      LRD: "153.7919717514906287",
      LSL: "18.0800000000000119",
      LYD: "5.0600000000000004",
      MAD: "10.953000000000001",
      MDL: "19.4476857253986776",
      MGA: "4246.2845010615711253",
      MKD: "63.1365920000001451",
      MMK: "2100.9256999998727566",
      MNT: "3271.9460279999293036",
      MOP: "8.0894739999999987",
      MUR: "44.5275427341959506",
      MVR: "15.4498374677098397",
      MWK: "1026.9049086054631341",
      MXN: "20.1462000000000033",
      MYR: "4.6369999999999993",
      MZN: "63.8923337505502727",
      NAD: "18.0800000000000119",
      NGN: "432.3700000000066131",
      NIO: "35.9818493159310717",
      NOK: "10.8860700000000044",
      NPR: "130.3451278294668624",
      NZD: "1.7873300000000001",
      OMR: "0.3849600719413382",
      PAB: "1.0005586",
      PEN: "3.9760704177975274",
      PGK: "3.5234591912956464",
      PHP: "58.8019999999999288",
      PKR: "228.1000000000017336",
      PLN: "4.9517300000000011",
      PYG: "7072.6108999988403238",
      QAR: "3.6410000000000005",
      RON: "5.0531199999999989",
      RSD: "119.6551538466140583",
      RUB: "57.7510000000001644",
      RWF: "1041.5000000000355672",
      SAR: "3.7568009999999994",
      SBD: "8.1500949999999998",
      SCR: "14.5087237328624769",
      SEK: "11.1024999999999983",
      SHP: "0.8968609865470852",
      SLL: "7773.0000000012879861",
      SRD: "28.5899999999999744",
      SSP: "130.26",
      STD: "22750.2905040071040061",
      SVC: "8.7550539999999972",
      SZL: "18.0800000000000119",
      THB: "37.6639180794716204",
      TJS: "9.8299670000000023",
      TMT: "3.51",
      TND: "3.2689919442231519",
      TOP: "2.4254183846713558",
      TRY: "18.5019969205276325",
      TTD: "6.7973819999999995",
      TWD: "31.8175999999999593",
      TZS: "2332.0895522388059701",
      UAH: "36.7702069999999597",
      UGX: "3852.0801232665639445",
      UYU: "41.6840350145894123",
      UZS: "11014.999999996265915",
      VES: "8.1734370651476061",
      VND: "23809.5238095238095238",
      VUV: "120.819439",
      WST: "2.7636640000000001",
      XAF: "669.1122079999937805",
      XAG: "0.052545",
      XAU: "0.000602",
      XCD: "2.702410550210788",
      XDR: "0.747967",
      XOF: "588.2352941176470588",
      XPD: "0.000462",
      XPF: "66.9299999999999021",
      XPT: "0.00116",
      XTS: "1731.1787969035673543",
      YER: "250.2999999999990263",
      ZAR: "18.0910399999999909",
      ZMW: "15.7834480000000046",
      JEP: "0.895359",
      GGP: "0.895359",
      IMP: "0.895359",
      GBX: "103.4286600817086415",
      CNH: "7.1472999999999991",
      ZWD: "523.1696000000009813",
      ZWL: "322.0000000000001288",
      VEF: "817343.7065147606143319",
      SGD: "1.43606",
      AUD: "1.5627441787779341",
      USD: "1.0",
      BTC: "0.0000517119900713",
      BCH: "0.0084634590156997",
      BSV: "0.0205573086371532",
      ETH: "0.000752046506556",
      ETH2: "0.000752046506556",
      ETC: "0.0360490266762797",
      LTC: "0.0186811133943583",
      ZRX: "3.7117802626084536",
      USDC: "1",
      BAT: "3.2798176421390971",
      LOOM: "18.6393289841565704",
      MANA: "1.4285714285714286",
      KNC: "0.8459521191100584",
      LINK: "0.1313370107696349",
      DNT: "23.7247924080664294",
      MKR: "0.0012864466414094",
      CVC: "7.7821011673151751",
      OMG: "0.5757715338553662",
      GNT: "4.4280798357997148",
      DAI: "0.999950002499875",
      SNT: "35.3544281421248011",
      ZEC: "0.0174840458082",
      XRP: "2.1032140075567217",
      REP: "0.1380262249827467",
      XLM: "8.376893177858196",
      EOS: "0.8330556481172942",
      XTZ: "0.7012622720897616",
      ALGO: "2.7777777777777778",
      DASH: "0.0235737859500236",
      ATOM: "0.077384407041981",
      OXT: "10.1265822784810127",
      COMP: "0.0159286396941701",
      ENJ: "2.1953896816684962",
      REPV2: "0.1380262249827467",
      BAND: "0.7911392405063291",
      NMR: "0.0678656260604004",
      CGLD: "1.25",
      UMA: "0.4268943436499466",
      LRC: "3.3658700774150118",
      YFI: "0.0001220860352499",
      UNI: "0.1526834109474006",
      BAL: "0.186219739292365",
      REN: "8.5763293310463122",
      WBTC: "0.0000517178738265",
      NU: "6.5595277140045917",
      YFII: "0.0010622025832767",
      FIL: "0.1766004415011038",
      AAVE: "0.013284623048821",
      BNT: "2.2904260192395786",
      GRT: "10.1368474404460213",
      SNX: "0.422654268808115",
      STORJ: "2.2204951704230043",
      SUSHI: "0.8955758552749418",
      MATIC: "1.2874983906270117",
      SKL: "25.3485424588086185",
      ADA: "2.3094688221709007",
      ANKR: "32.6317506934247022",
      CRV: "1.0948705315596431",
      ICP: "0.1631853785900783",
      NKN: "10.9289617486338798",
      OGN: "6.7321933485929716",
      "1INCH": "1.7301038062283737",
      USDT: "0.9999650012249571",
      FORTH: "0.2114164904862579",
      CTSI: "6.9396252602359473",
      TRB: "0.061652281134402",
      POLY: "4.1076196344218525",
      MIR: "4.8935649620748715",
      RLC: "0.825559316436886",
      DOT: "0.158340590610403",
      SOL: "0.030206917384081",
      DOGE: "16.1838485191778605",
      MLN: "0.0520426749934947",
      GTC: "0.5420054200542005",
      AMP: "198.2160555004955401",
      SHIB: "88378.2589482987185152",
      CHZ: "4.0733197556008147",
      KEEP: "6.9783670621074669",
      LPT: "0.11001100110011",
      QNT: "0.0069139558198223",
      BOND: "0.1947419668938656",
      RLY: "48.5436893203883495",
      CLV: "11.2359550561797753",
      FARM: "0.0259201658890617",
      MASK: "0.8583690987124464",
      FET: "12.0627261761158022",
      PAX: "1.0013016921998598",
      ACH: "84.3775049571784162",
      ASM: "53.5762121618001607",
      PLA: "3.161555485298767",
      RAI: "0.3527336860670194",
      TRIBE: "4.5829514207149404",
      ORN: "0.8888888888888889",
      IOTX: "30.4090010643150373",
      UST: "33.692722371967655",
      QUICK: "0.0174687745654642",
      AXS: "0.0788022064617809",
      REQ: "9.578544061302682",
      WLUNA: "3444.3564220025488238",
      TRU: "19.2492781520692974",
      RAD: "0.4962779156327543",
      COTI: "9.2123445416858591",
      DDX: "1.7699115044247788",
      SUKU: "13.5226504394861393",
      RGT: "0.35650623885918",
      XYO: "144.8225923244026068",
      ZEN: "0.0708968450903935",
      AST: "8.4423807513718869",
      AUCTION: "0.1550387596899225",
      BUSD: "0.9995002498750625",
      JASMY: "151.4004542013626041",
      WCFG: "3.3277870216306156",
      BTRST: "0.4327131112072696",
      AGLD: "3.1041440322830979",
      AVAX: "0.057987822557263",
      FX: "4.2580370449222908",
      TRAC: "5.7388809182209469",
      LCX: "21.834061135371179",
      ARPA: "29.4985250737463127",
      BADGER: "0.2762430939226519",
      KRL: "2.7446136956223412",
      PERP: "1.7619592987401991",
      RARI: "0.4434589800443459",
      DESO: "0.1033057851239669",
      API3: "0.5997001499250375",
      NCT: "101.4713343480466768",
      SHPING: "129.5085151848734054",
      UPI: "88.5347498893315626",
      CRO: "8.9645898700134469",
      MTL: "0.9456264775413712",
      ABT: "7.5843761850587789",
      CVX: "0.2050651081718446",
      AVT: "0.6825938566552901",
      MDT: "39.0854016025014657",
      VGX: "1.686056314280897",
      ALCX: "0.0478468899521531",
      COVAL: "78.6782061369000787",
      FOX: "23.8379022646007151",
      MUSD: "1.0039656643742784",
      CELR: "64.7458724506312723",
      GALA: "24.5519273262951142",
      POWR: "5.1440329218106996",
      GYEN: "144.9590490686381097",
      ALICE: "0.5820721769499418",
      INV: "0.0138389150290617",
      LQTY: "1.3793103448275862",
      PRO: "1.6260162601626016",
      SPELL: "975.6097560975609756",
      ENS: "0.0644329896907216",
      DIA: "2.6060329663170239",
      BLZ: "11.5207373271889401",
      CTX: "0.302571860816944",
      ERN: "0.2645502645502646",
      IDEX: "15.9872102318145484",
      MCO2: "0.4089979550102249",
      POLS: "2.1365238756543104",
      SUPER: "7.6869859328157429",
      UNFI: "0.158856235107228",
      STX: "3.0811893390848868",
      KSM: "0.0234301780693533",
      GODS: "2.4807124606186897",
      IMX: "1.3122498523718916",
      RBN: "3.9783577339274348",
      BICO: "2.410509822827528",
      GFI: "1.1976047904191617",
      ATA: "6.13685179502915",
      GLM: "3.450060376056581",
      MPL: "0.0542888165038002",
      PLU: "0.136518771331058",
      SWFTC: "628.7331027978623075",
      SAND: "1.1878600700837441",
      OCEAN: "6.2053986968662737",
      GNO: "0.0082901554404145",
      FIDA: "2.1229168878038425",
      ORCA: "1.1784115012962527",
      CRPT: "8.3998320033599328",
      QSP: "64.6830530401034929",
      RNDR: "2.1500752526338422",
      NEST: "58.9275191514437242",
      PRQ: "9.7181729834791059",
      HOPR: "15.8102766798418972",
      JUP: "120.4964453548620316",
      MATH: "8.8652482269503546",
      SYN: "0.7581501137225171",
      AIOZ: "19.6850393700787402",
      WAMPL: "0.2085505735140772",
      AERGO: "7.7881619937694704",
      INDEX: "0.4444444444444444",
      TONE: "68.7285223367697595",
      HIGH: "0.6765899864682003",
      GUSD: "1",
      FLOW: "0.5906674542232723",
      ROSE: "16.3385344334613185",
      OP: "1.0970927043335162",
      APE: "0.1859427296392711",
      MINA: "1.6891891891891892",
      MUSE: "0.1251721116535236",
      SYLO: "351.6792685071215052",
      CBETH: "0.0007704278956532",
      DREP: "2.0329335230737955",
      ELA: "0.6662225183211193",
      FORT: "7.0997515086971956",
      ALEPH: "8.547008547008547",
      DEXT: "9.004952723998199",
      FIS: "3.0897574540398579",
      BIT: "2.0889910173386254",
      GMT: "1.5569048731122528",
      GST: "39.2156862745098039",
      MEDIA: "0.1386001386001386",
      C98: "2.7731558513588464",
      AURORA: "1",
      BOBA: "3.4193879295606087",
      DAR: "4.8192771084337349",
      DYP: "6.0818002128630075",
      GAL: "0.3864734299516908",
      INJ: "0.5839416058394161",
      LOKA: "1.9252984212552946",
      METIS: "0.0416233090530697",
      MONA: "0.0016480980947986",
      MXC: "14.4644536052650611",
      NEAR: "0.2794857462269424",
      OOKI: "198.0394098425586692",
      POND: "93.4579439252336449",
      PUNDIX: "2.0385281826521252",
      RARE: "6.1690314620604565",
      STG: "1.901863826550019",
      TIME: "0.0168180289270098",
      XCN: "13.9120756816917084",
      XMON: "0.0000513983123547"
    }
  }
}

export const cbEUR = {
  data: {
    currency: "EUR",
    rates: {
      AED: "3.5999999999999997",
      AFN: "86.1300000000003326",
      ALL: "116.6764480422275401",
      AMD: "393.9900000000039092",
      ANG: "1.7677470000000001",
      AOA: "423.4158000000064069",
      ARS: "144.3832740639993301",
      AWG: "1.7646109999999999",
      AZN: "1.6665770000000001",
      BAM: "1.9557759932408382",
      BBD: "1.9709999999999999",
      BDT: "98.8533017002767892",
      BGN: "1.9557606931215896",
      BHD: "0.3697757162370736",
      BIF: "2016.2999999998105686",
      BMD: "0.9761908039116746",
      BND: "1.4007564084605687",
      BOB: "6.7394527564361774",
      BRL: "5.3079964967223122",
      BSD: "0.9762",
      BTN: "79.4912559618441971",
      BWP: "13.0051306540943468",
      BYN: "2.4640000000000003",
      BYR: "24640.000000000003",
      BZD: "1.9677",
      CAD: "1.3554999137902055",
      CDF: "2005.560000000021283",
      CHF: "0.9671498837630912",
      CLF: "0.034392",
      CLP: "940.7935000000241603",
      CNY: "6.9743853840316286",
      COP: "4420.7999999993662341",
      CRC: "612.4599999999860065",
      CUC: "0.980339",
      CVE: "110.778342",
      CZK: "24.5889949494204374",
      DJF: "173.6111111111111111",
      DKK: "7.4333000000000017",
      DOP: "52.1230000000000646",
      DZD: "138.0209999999997229",
      EGP: "19.1510000000000122",
      ETB: "51.5828000000001109",
      EUR: "1.0",
      FJD: "2.2645953168168848",
      FKP: "0.877756",
      GBP: "0.87778",
      GEL: "2.7663940000000003",
      GHS: "10.2010390166279996",
      GIP: "0.877756",
      GMD: "54.310798",
      GNF: "8438.5999999995046542",
      GTQ: "7.6888999999999993",
      GYD: "203.6659877800407332",
      HKD: "7.6930999999999976",
      HNL: "24.1049999999999925",
      HRK: "7.5237105977633212",
      HTG: "118.1180000000002129",
      HUF: "422.9780000000066017",
      IDR: "14925.373134328358209",
      ILS: "3.4880000000000002",
      INR: "79.8988799775004754",
      IQD: "1424.5014245014245014",
      ISK: "140.500000000000569",
      JMD: "148.4212432357018395",
      JOD: "0.6949",
      JPY: "141.9255899999997829",
      KES: "117.853649338251759",
      KGS: "78.6446350000002411",
      KHR: "4000",
      KMF: "491.590947",
      KRW: "1411.831144995058591",
      KWD: "0.30379",
      KYD: "0.8130083283760151",
      KZT: "462.962962962962963",
      LAK: "16114.799999994972827",
      LBP: "1470.5882352941176471",
      LKR: "356.7939000000024737",
      LRD: "149.8399999999992508",
      LSL: "17.5687999999999893",
      LYD: "4.9322999999999992",
      MAD: "10.7341999999999993",
      MDL: "19.0355000000000163",
      MGA: "4149.3775933609958506",
      MKD: "61.5763546798029557",
      MMK: "2049.7263615307356468",
      MNT: "3207.6173109995386809",
      MOP: "7.8876794447073671",
      MUR: "44.8400000000000248",
      MVR: "15.1434220000000096",
      MWK: "1001.9859999999524033",
      MXN: "19.7489999999999933",
      MYR: "4.5250854901776232",
      MZN: "62.5729757329485512",
      NAD: "17.5687999999999893",
      NGN: "422.1999999999927973",
      NIO: "35.1000351000351",
      NOK: "10.6741399999999983",
      NPR: "127.2069999999997477",
      NZD: "1.7521000000000001",
      OMR: "0.3773300128292204",
      PAB: "0.9762",
      PEN: "3.8812999999999996",
      PGK: "3.4397000000000004",
      PHP: "57.5705238917674151",
      PKR: "222.9231918142603966",
      PLN: "4.8578799999999992",
      PYG: "6901.099999998638551",
      QAR: "3.5764999999999999",
      RON: "4.9491000000000007",
      RSD: "117.328000000000395",
      RUB: "57.4493999999999554",
      RWF: "1033.5400000000119911",
      SAR: "3.6821928784180416",
      SBD: "7.989858",
      SCR: "12.796999999999998",
      SEK: "10.8949991191393212",
      SHP: "0.877756",
      SLL: "15151.5151515151515152",
      SRD: "26.7308206361935311",
      SSP: "127.6989990000005678",
      STD: "22303.004094",
      SVC: "8.5324232081911263",
      SZL: "17.5687999999999893",
      THB: "37.0509654555323575",
      TJS: "9.5877277085330777",
      TMT: "3.4409909999999996",
      TND: "3.1768000000000001",
      TOP: "2.379427",
      TRY: "18.1587071000544761",
      TTD: "6.6319000000000007",
      TWD: "31.188061000000044",
      TZS: "2276.449999999993717",
      UAH: "36.0523999999999847",
      UGX: "3703.7037037037037037",
      UYU: "40.8496732026143791",
      UZS: "10751.6599999997068667",
      VES: "4761999.9996371356000277",
      VND: "23255.813953488372093",
      VUV: "118.444045",
      WST: "2.7093279999999997",
      XAF: "655.9570000000016309",
      XAG: "0.0515",
      XAU: "0.0005901619994689",
      XCD: "2.649416",
      XDR: "0.733261",
      XOF: "655.9570000000016309",
      XPD: "0.00045",
      XPF: "119.331742",
      XPT: "0.0011",
      XTS: "1696.866833148938649337774",
      YER: "245.1707491682582334",
      ZAR: "17.7405100000000131",
      ZMW: "15.399200000000002",
      JEP: "0.877756",
      GGP: "0.877756",
      IMP: "0.877756",
      GBX: "101.428114642391856618072",
      CNH: "7.0032915470271027",
      LTL: "0",
      ZWD: "512.800378528",
      ZWL: "315.6692579999997047",
      VEF: "476199999963.71356000277",
      SGD: "1.40524",
      AUD: "1.5321499999999999",
      USD: "0.98018",
      BTC: "0.0000506894268952",
      BCH: "0.0082829454153897",
      BSV: "0.020145928392321279074",
      ETH: "0.0007367812238673",
      ETH2: "0.0007367812238673",
      ETC: "0.0352982703847511",
      LTC: "0.0183099880985077",
      ZRX: "3.6370249136206583",
      USDC: "0.9799118079372856",
      BAT: "3.2085218339910803",
      LOOM: "18.32112149532710283122",
      MANA: "1.4005602240896359",
      KNC: "0.829185348109297042512",
      LINK: "0.1287001287001287",
      DNT: "23.254567022538552769292",
      MKR: "0.001261785226950910432",
      CVC: "7.627859922178988329518",
      OMG: "0.5629679671226707",
      GNT: "4.286827969039915912138",
      DAI: "0.9801309934503274775",
      SNT: "34.653703376347887542198",
      ZEC: "0.0171232876712329",
      XRP: "2.0621471719794723674",
      REP: "0.1382552191345223",
      XLM: "8.2020324636444911",
      EOS: "0.8156606851549755",
      XTZ: "0.6872852233676976",
      ALGO: "2.7214587018641992",
      DASH: "0.023106553512494132248",
      ATOM: "0.0757575757575758",
      OXT: "9.925873417721519028286",
      COMP: "0.015612934055431648618",
      ENJ: "2.151877058177826605316",
      REPV2: "0.1382552191345223",
      BAND: "0.7751937984496124",
      NMR: "0.066511473229132",
      CGLD: "1.2269938650306748",
      UMA: "0.4195510803440319",
      LRC: "3.299158532480646266124",
      YFI: "0.00011965474957384839",
      UNI: "0.1497005988023952",
      BAL: "0.1825288640595903257",
      REN: "8.406346483704974292196",
      WBTC: "0.00005069282556725877",
      NU: "6.4329366355741396",
      YFII: "0.001041149728076155806",
      FIL: "0.1733102253032929",
      AAVE: "0.0129895434175489",
      BNT: "2.2471910112359551",
      GRT: "9.9304865938430983",
      SNX: "0.412796697626419",
      STORJ: "2.1774158428776728",
      SUSHI: "0.8778089887640449",
      MATIC: "1.2612726240776944",
      SKL: "24.8138957816377171",
      ADA: "2.2626994003846589",
      ANKR: "31.9284802043422733",
      CRV: "1.0718113612004287",
      ICP: "0.1597444089456869",
      NKN: "10.7238605898123324",
      OGN: "6.594765525129516278982",
      "1INCH": "1.6934801016088061",
      USDT: "0.9796190261607261",
      FORTH: "0.2070393374741201",
      CTSI: "6.802081887578070824514",
      TRB: "0.06043033292231815236",
      POLY: "4.028688861487875059676",
      MIR: "4.7961630695443645",
      RLC: "0.80919673078510691948",
      DOT: "0.1550387596899225",
      SOL: "0.0296120817293456",
      DOGE: "15.8604282315622522",
      MLN: "0.0511665984445354",
      GTC: "0.53126287262872624609",
      AMP: "194.287413280475718495218",
      SHIB: "86617.5833694239930706",
      CHZ: "3.9888312724371759",
      KEEP: "6.8273366559705059",
      LPT: "0.1082251082251082",
      QNT: "0.006765694564279527742",
      BOND: "0.190882181110029183808",
      RLY: "47.0588235294117647",
      CLV: "11.1364775321565789",
      FARM: "0.025406428201140497106",
      MASK: "0.8403361344537815",
      FET: "11.823642943305187000396",
      PAX: "0.981455892660458578764",
      ACH: "82.687700354310781208238",
      ASM: "52.612989801395598478528",
      PLA: "3.099873497786211283868",
      RAI: "0.345742504409171075492",
      TRIBE: "4.492117323556370281272",
      ORN: "0.87088405153265214676",
      IOTX: "29.546461811198109",
      UST: "33.0249326145552560779",
      QUICK: "0.017122543453576699556",
      AXS: "0.0771010023130301",
      REQ: "9.4393052671323391",
      WLUNA: "3374.462078700037869670238",
      TRU: "18.9035916824196597",
      RAD: "0.4863813229571984",
      COTI: "9.017295308187672470016",
      DDX: "1.6949152542372881",
      SUKU: "13.2100396301188904",
      RGT: "0.3494402852049910524",
      XYO: "142.146410803127221",
      ZEN: "0.06949166962070190083",
      AST: "8.275052764879696101642",
      AUCTION: "0.15220700152207",
      BUSD: "0.97969015492253876125",
      JASMY: "148.287443267776096820178",
      WCFG: "3.2414910858995138",
      BTRST: "0.4228329809725159",
      AGLD: "3.042619897563246899622",
      AVAX: "0.0568181818181818",
      FX: "4.158591429783623269772",
      TRAC: "5.6179775280898876",
      LCX: "21.5749730312837109",
      ARPA: "28.9017341040462428",
      BADGER: "0.2702702702702703",
      KRL: "2.5980774227071967",
      PERP: "1.723543605653223",
      RARI: "0.4166666666666667",
      DESO: "0.1075268817204301",
      API3: "0.587637889688249436208",
      NCT: "99.9000999000999001",
      SHPING: "127.4209989806320082",
      UPI: "86.779991146525011029268",
      CRO: "8.8028169014084507",
      MTL: "0.926884160756501222816",
      ABT: "7.434053849070913902202",
      CVX: "0.201000717727878640028",
      AVT: "0.669064846416382250218",
      MDT: "38.310728942739886649826",
      VGX: "1.6526194017517766",
      ALCX: "0.046849379245725",
      COVAL: "77.027897838899803510734",
      FOX: "23.365435041716328926718",
      MUSD: "0.984067064906380202112",
      CELR: "63.462609258659760483014",
      GALA: "24.0384615384615385",
      POWR: "5.0188205771643664",
      GYEN: "142.085960716097702365746",
      ALICE: "0.570535506402793953524",
      INV: "0.013564627733185697106",
      LQTY: "1.3157894736842105",
      PRO: "1.593788617886178836288",
      SPELL: "957.160294907475220983704",
      ENS: "0.0630715862503942",
      DIA: "2.5350791578467038",
      BLZ: "11.292396313364055307218",
      CTX: "0.2967359050445104",
      ERN: "0.2604166666666667",
      IDEX: "15.670343725019984050712",
      MCO2: "0.400891615541922242482",
      POLS: "2.094177972438841967872",
      SUPER: "7.534629871627334875722",
      UNFI: "0.15570770452740274104",
      STX: "3.020120166384224343624",
      KSM: "0.022965791940018717594",
      GODS: "2.426939028164654893892",
      IMX: "1.285903574942604099294",
      RBN: "3.900592940427394688874",
      BICO: "2.3651844843897824",
      GFI: "1.173868263473053915106",
      ATA: "6.015219392451672247",
      GLM: "3.351615660796717435566",
      MPL: "0.053227260385555219644",
      PLU: "0.13381296928327643044",
      SWFTC: "616.27161270040867656535",
      SAND: "1.164385839866951797566",
      OCEAN: "6.086184414778019215876",
      GNO: "0.00812584455958548461",
      FIDA: "2.0746887966804979",
      ORCA: "1.155055385340560971486",
      CRPT: "8.233347333053338931904",
      QSP: "63.401034928848641670722",
      RNDR: "2.1143884131514959",
      NEST: "57.759575721862109586356",
      PRQ: "9.525558794946550021062",
      HOPR: "15.472454617205998382168",
      JUP: "117.647482446138150423416",
      MATH: "8.685688967656180775104",
      SYN: "0.739479441720105575856",
      AIOZ: "19.294881889763779569236",
      WAMPL: "0.204204166666666633994",
      AERGO: "7.636774444877288625206",
      INDEX: "0.435635555555555511992",
      TONE: "67.36632302405498286671",
      HIGH: "0.663179972936400570054",
      GUSD: "0.98018",
      FLOW: "0.57930260047281326426",
      ROSE: "16.01470468099011516733",
      OP: "1.075348326933625908916",
      APE: "0.1819008640291041",
      MINA: "1.6597510373443983",
      MUSE: "0.122691200400550762248",
      SYLO: "344.708985405310356966936",
      CBETH: "0.000755181287270563108",
      DREP: "1.99264078064647287319",
      ELA: "0.653017988007994715474",
      FORT: "6.959034433794817183208",
      ALEPH: "8.388361146769362414906",
      DEXT: "8.82647456100855469582",
      FIS: "3.028518461300787916422",
      BIT: "2.047587215374973844572",
      GMT: "1.526047018527167949504",
      GST: "38.438431372549019586702",
      MEDIA: "0.135853083853083852948",
      C98: "2.718191902384914064352",
      AURORA: "0.982144288577154343778",
      BOBA: "3.351615660796717435566",
      DAR: "4.723759036144578274282",
      DYP: "5.96125893264406269135",
      GAL: "0.378740340030911878206",
      INJ: "0.572367883211678872898",
      LOKA: "1.887139006546014661028",
      METIS: "0.040798335067637858546",
      MONA: "0.001616671752199870774",
      MXC: "14.177768134808707588998",
      NEAR: "0.273869796032411296258",
      OOKI: "194.01821060965954079378",
      POND: "91.820140515222482409658",
      PUNDIX: "2.003024420149177435924",
      RARE: "6.04676125848241825217",
      STG: "1.86416888550779762342",
      TIME: "0.016484695593676465764",
      XCN: "13.642981418331129482942",
      XMON: "0.00005038102437524905"
    }
  }
}