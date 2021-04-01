
	var projectContract = vnt.core.contract([{"name":"$stucontract","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"RemokeFunc","constant":false,"inputs":[{"name":"schoolname","type":"string","indexed":false},{"name":"id","type":"uint64","indexed":false},{"name":"infohash","type":"string","indexed":false},{"name":"date","type":"uint64","indexed":false}],"outputs":[{"name":"output","type":"bool","indexed":false}],"type":"function"},{"name":"SchoolRegister","constant":false,"inputs":[{"name":"SchoolIn","type":"string","indexed":false},{"name":"SchoolPk","type":"string","indexed":false}],"outputs":[{"name":"output","type":"bool","indexed":false}],"type":"function"},{"name":"RegisterFunc","constant":false,"inputs":[{"name":"scname","type":"string","indexed":false},{"name":"infohash","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"}]);
	var project = projectContract.new(
    {
     	from: vnt.core.accounts[0], 
     	data: '0x0161736db90dae0100789cb4597d6c1cc775ffcdcccef078cb23efc8981fa2652f693ba11be5485114e5c892ecb324db94624b1125274ae090cbbb3d72ade31e73b747492ecc63a5d8965407a19b16298c42b5d3d6161ab730da06456c19f980d14ac91fb551c44e1334315cdbc91f6e1a58fd88213408deecdedd9e442b728048c0ce9b37eff77b6fde9b993deebcb7f6de6ff4bd02bb3ccf00b0b1f834ab629a2f2d619a2d615a2e5597aa554c03d360d5695eadb2ea34d8d2345b62d569a3ba545d6255fe223385e32daa7dcea253f201ea243f55727de753ae3fb7b7e87abe53022375c73ec7ce5da655995cee2ebb0c4e9d782697dbed1c9df0f2450852744d78aeefda05f741e73ebbe4da3305a70c83465aef72fc49c7cb392548eacb9d9fafd8052892dbee72fcfdeebc53f6edf905b490aae5ce5271fec0f81862dae9f6a297b57d28116b310cc350aad5906c813126050357d7882acb3c77d230aba837ad668b1f53f3ce7cb17494c39c9a9a73ec85a919bbec08169f9acad9be3de57839c19339275bb04b4eeece8a97f5dda287b6b61bcb7e255bf4fc929df5d1de3e999d2b160bfb9c59b74c89e868ab89044132becf992f1e72742715ff6e6b0b87791deec01d48fec1f2f272201d0ba4e4716acdef08c69732af9f585ec6df0c2263647e10882cd39a41f20b64632163582ca36afdccd99ab5b2d030cbbc5c53b326f54bab5bff775d9df9c56a2e5593cb9593a18991593e19021bd62c6350901916e947d832dfaa39504dea73abab4f9cacab9b9da84b9c34c31efbed607faa617a020de59993abe6ecd99aba25aa36d722f94512920f6b2b241fa1769c6b73f30863d5603c8301ce6f0f4633180ac6938f523781cc13948de4b266ccc0c238d775e1b793a9ae1609679a300db30c2c361e9ab1016e5adc3c2b38abf2a53036ed7580274fe856344143fe01dee437f85f1fb578e076672274f683009cc1cd42afdf4d422f0d02e8125aac0660759b41e38eea27a96f1911f3c76a825eab7726b82508a117dd67128246f412b28ce4493d9953f4ec3069406f86ccd74f34a9c7b8de0c034646d3be1ca4e581f1508a7aa7999c3819ce248c60bc1691253605510490d76be93af77ed1bcb4fac0159957a5331f638c37d68db16abde4eaebc492914a6928bbac36d162d6f3bb4a746cc0302dc334cf3281cc72ccfcf8ce7dfbf6ecc3be9df7ecd9bd137b339393983cb07dfbcec949ecf10a472d7fceb18a873da764656dcf2a2e3825db77604dde0b64cec6cc240c401940c2003a0d00999763e6347ed7fffed734d33967a6323be57af9e2db12140700835ea168c30da1dde1b04d32803f05601300de21c51603105b08711780afd18b77447e02807a9a1e8cff5dc4f87603e0ff1851ec20c5d988e26e527c1bc05748d125c55ee2ff33e27f06c02bc43facce0190067f0dc037c92e2ec532d9bd04a06588c7633f06f09e1e418c33c0a4b0e3b1d847584ddf1b4bd7650b06cdf72291af536f1249cce866c0b5048bb524b988c51840d3e412b1544d5646aca7c6d21203dfc680bd846993e2d314d00106b4f4f2b6d85d35485b109086b4c562bbeb7212fc7e1626a25d8a33948819063c497c29291688efaf882fc9530dbe54c017c846832f15037f80013f2178af14cf12fc4d16d66981016c432b153905a09b03f1ebe8713307604a00d7017897cc2eb41da16686259675bb910389152d9257a853e482b51319710b0eb08b3f9640e2cb0df1f1bad8f12724fe3f894972bc114007a5fe578177507a9107d043869c9165e79723f2e30db94b93492d7f88d87a00b4139bc12233d243fb6b8e5a58d413f9bf8158cc882733e22990afe9e6c116608926f8ed0086c92c19812723f06424d0ce06552f5175d5a8cc9b007c8701b772805f6bfe8c016b29a1d4dda073bb13c07eeadeaa2bf0152d52ad134f6851174397944af74d03887f8f1eaf1a35fd10808f1940f74623cc7d5f982d7e5f245981f104803708fff3267c8654f790aae78fa9eefb59c753d41ea0b585de33243b14204bfc83967558ed8a0347003c40a12ee8093cab451a4efc455deca3f84628a25223cadfe3ab45d947a1ec2575390808bd2f92c75d81f7ef6959d3bf5a17d1fb23923ff39eaee33b5a0e025ce6c059061ca550aa1af6f586f8445d0c667b9c66db417b9f3f425c1d67c9e0613d03cafc0285753292ff35df22ab6f93d52902f4516a4f90d5a920c140fb3603780cc02364f5559da397b4a843d0d8af36ea1d68ffa5ae0d42f8cb7a08bf24f2672221043bbf8392330a24dbc3737fdeced2d10f3c2d12a1aa647bb34e990e862e00d703f868e495b10e401ac028806d113d31d3eaddc181bb39b087039fe48df1d5c63e1719ff7baa0007fe8903df8fe87fc881ffe0c04f39f03f1cf83f0e740ba04f00fd02b851001f16c0c704302cae8cfb9c000e0be01d01fc5cd04b046831805b8d062e6b0005aaa10154237a5adf9df4e2a1f322ecdf1db6b3613b1eb61900b4a37fca00daca9207fa3bc3f1ebc3f6e6b0dd15e9d35659e200ad487abbd2b2f86e240efc27af15ca9e9929398b2cc56e6aef92a23dd9d3df9e62077a003e06d13ed1755bdf66f35693f702622326ba00a31b135da29db480ecd03a752344fb36d33481962e669ac1602ca119a8738b09b4a6598a75aaf55d405c821a330dd20464b7f5016d6916743ed2775b9f6502098940415eda03829a05c506748c452c926bd9fa2eb2f9b479d004521180ac013a434a4980aeb148e74311341db1d43dd01374bac774c43db50083f07a1bf11239a9faea28135863ea54024fd67f23155ccf59d1bf91f40f1dc62eb627a86141f9d870a958f487678bc3e5527678d6f5e72a33e96c717e78d1f3b373b6eb0dd7fe64ae0b655c3d66a6e216721124163dbfe0cea4e7c877f40ff2a98592932dce2fb805279d85de4a927e2440bc01265be20352ce29f144f598644afc0c1667600c92d3ca16171893227ef0cf8f4b365b1bd0d88b8cc98ef85669be206f52efcaf55be4d069d9a2c4db4bc7a4dc467ccf4ba1c432b7b888c08e7126cdf85669a99845e6af2f59528e04e6a6128f724b5a6a97ec50eba4f5a41c51c764cf6969e6c9f4df97f251e6939730ffa1661e906bd4ab64fdda9225e3e2af595a0a755abcfb9025a5126f83946718119c6e9ace0aaf4f678d7a5e5a96bc212d479f27a657962c29c4732cadc43b0f6da9d108f1b7ec791d80c121396d6fd1cf248b3f1eab5c88cdc666632fc42ab183b1ca850b5aeeba103ba81f6fd1a0f6ad81741e880d041c9895e6ac4ca834cd97a94ac34647b899c9547cab6c7d4ba626e44dc3b255f979d9a646e487555eb6adc8847a448917ab5ba88aff0cab119a469f079349cace79d9a67cc9d4a397d0ff2b98ec8e0fc8fee332a1560c46336fcfd76a6370a27d2d5c1c0dd4bf2188aaff2d9952befa9aecff848c29ff984ca9cdb26f5489a7aa2b847ce3b280de0c03ea392f9365b956cf477d41b21b1a1ee8e813ff45bfe7c88370f2b27be2fde3eb57e255fa9b4e24d3b25f2cacc81e91da25fb45d1976b452a4dfc32a1445b5ef68ec835e79538553d47a15d8c8646a7acf89576795076bb32f5b04c1e979de765f24b62475a6c59916bc4ced33a853125b61e93c9cd3225f6a76552ac5b91fde2c02eca834c2af1515ff68bfbd24136fad436d921d69d930965c93e25f6a7c5fab4d8b322d78ad1b4ec13f7faf2469206096bc9356a580ea9b45cb322bb2d3994965bd232e3cb8d7a87b6e5957863c9221f8f324b7689ee7458d217ea035f64965cabde94c958a7bc4689568aeff08abc4ec4495a5c91d70a7397ec0f22adf8728d68a3019f929620a94c527b5a5e4b26e4d60db86f51e27166c9ad6a45aed7d124c2688694f82366c981ddd252be1c5265b969580e7d49ee1e967b952f77686333df282ebdc7c4532c286e724e76c6ba28c94f57d3e287a0343f53dd55cbf38f704c5eb3555e1feb22cd3169a9adf27af5acb47c799d1a56e2fb4bba92cfb1f044f8898c874774d92f650bb6376b2d3aa5b25bf4ac5bd223e9116bc82f55bc43d686b1f51f1f1fb9f9b73f7487dfff9cbd6a4e2cdaa51164e7ec12ca7ec9f56649314a8f0df41843363fe93ee8a050f4662dd7f3e17afe865164f33b6cdf86ebe59c23c1987e54bcb23beb39396d59713d7f7c0c8b76a1e260c2cb17e7ecf21c267ddb77b0831edbf3a4bd9bb405c79bf5e760974af6d1f51b376c5a7fcbe8a64de3a19ba9120e3947316f2f2cb8de6c6478d12eadc76476efa17bec05e80f1ab073b992532e639ff3f98a5b72902d7a39577f279ebaa3582c60be3c8b4c6edef5b617bdbc5b9a4739f8cc1d7c34de79c42dfb286b79c20b9535cba0e7d9f38ef689ed4ec977f36ed6f69d00a76783cb3e501f18dd383e69e79d7b2a059d93d18de375dd0e77b12e4f5666ea722697a3397bf9f2d8c2dcbcd7f4460d1c93dbfb9c521000b9b9e4b377d347efc827efa338820731b1036ebd221ab8f750284c782867f52ccbd985437073613eb42a4775c32f99413df60bd689f072825d762fc12fbd9210e16d8411b98890abdd41a8c6f5434b70f3106bba7468addd37c4c3ab0633353575d82ecf4f65ed42612aeb174be5b6cb2e0a126624a1ed4d97061d97dc19249bae0c52911b836f88c5cffefe204d7e70f360946270dd60b6e8957ddbf30737e7ed42d95937e87a0b15bf3cb8f9b3f7af1b2c56fc46c73fba40780d285528dec187d6d5691bdeae485ab76f9467b04e1dece54132cf39479c5c088f7871730deb60a75ed13a5c2c1fc403ad95dfeca32937756ca06aa0678ac5c2aad8703c1f16399ac7e69a5e5d2e6b5be083ccb3b67f7e33e67737d7e87abdda55f38157cc55af81ab9be715d097cdf4fee55f030000ffff', 
     	gas: '4000000'
    }, function (e, contract){
    	console.log(e, contract);
    	if (typeof contract.address !== 'undefined') {
        	console.log('Contract address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
   	 	}
 	})
	