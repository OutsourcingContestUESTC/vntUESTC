
	var projectContract = vnt.core.contract([{"name":"Migrations","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"setCompleted","constant":false,"inputs":[{"name":"completed","type":"uint32","indexed":false}],"outputs":[],"type":"function"},{"name":"get_last_completed_migration","constant":true,"inputs":[],"outputs":[{"name":"output","type":"uint32","indexed":false}],"type":"function"}]);
	var project = projectContract.new(
    {
     	from: vnt.core.accounts[0], 
     	data: '0x0161736db9078d0100789c9c575d6c1c5715feeedcbdb3eb197bbd9b4de2d86d9ac9a615a9306bc7494c9adf6ef8090142ab84504a15ad6777eeae4719cf3833b36e1d94dd6d5a68501f080f1552ab24a5121254802a04480d4f4820218104bcc00b9550155508fad422a42a80d09999dd1dd78915f083efb9e79cef3bdfbd7366f6de0fc6cfbd39760b66b0c400b05dd905d6c582d2e9608175b0203add4eb78b056001acbba074bbacab7c93e5b87457d4d37245fa214093c213be1dca27ec70f171cf7643e983917bfcb434ad755eb56a5927cc000a4db4aa657d4eae9e749b1e38394a275d3bb44dc7be28bf64fab6597764800c45464ec8f08c742de943d05c7cea42db74a07255643219888c60cb8c31c11914750befb2eaab57327a17fde1a59c9e0db2ea925cf2fc55057aadb628cde55add0c24675aad6699a15993aec59582251b8ee94bebd36db711da9e8b11ed94ddf24db20368a3810c3fe12d2d3b329416f4fb5b32ac396610d61a7d676da99f8e51ed454528d01fc0711c47e1d95eaf175b9763abf01c8dfa09c63ad5de955e0f3f2ca39a35501da9a2f03cc5aacff7dd3ced2e7c2d0aa2f0751ae79508ac37523cac9a35d87a1e56e569b7f26815bb63744c557881fe8fa17a25f2f5227d551898572206fdd0ffac952ac458bdaca0dacbe939f4ffaa5772fa981d18ae171aded3aef4817f08bd62c97abb55b3dda6774b0132516a86da14a3d89540dbc9f80600e506808f93c105a77c7e98102700bc4ecdbd577c1e80fa5dfac7941f03b02839237886926d4a0e01bc45c91f537f03209bc952c12280d700e48827f7532a3822003c00603b03d8fbda2d02d599fe6e34fe0280feafc8fc3565abffa44a2cd20202cc8e122f4d2b34bdfd6705d0af0dcd5706e6d80d32ff4d669e34ec07304e2cff8985609c989a008e53a2c228b3702d65bf32b48b119988ec4dc43601204f6c19965a5c14fa62bf5096a52b51fd2f108b9eaaa4a72ac576e9b5e4c9b0b135f047017c85d20a297821052fa4846e1a526d23aa529f6a3351cdd11350802df48c14956d7d30d9d226cdb5098acdd2be8f227a8abb01d8fd6d9c4c16ae9452ebc69612418b6c9b03a001e002cd27f4ef44037548c4fa38012727896c99cca988f22777a4c4d4ef011c02d021921d0392ab94ba33eecf83b4da39a0904fba7ec96c50e303d795b1c4e59b6e4b06d48a25003b007c14c3bf696aa564538ea6fcb427f3000e003805e031006753715a6807400fc04b00be0de05a2a7ea7d8af52715adcdb00a8ff3f00709b9e131bc6c9dc04805e975dc9fc33c9d84ac6f964ac26e3de44f7f964fe70a2f377493d3dc58f67797f83cc7add972bacc81eca9704cf1726eecb17d9d90940d9079e3f593a3679503fa42bdb00be1f274b40662b4e96789ebc80188f7cea83e0f9a3baae03d90a2bb24dea9e129013a061a402f2c4906393805661f1e42393c7260d1dd0056207718dc604fd0c52008ced4b65e4b7b33d25caf9b2fea40e8ca700a20f2824948200c57da9c9a6145a00259a9e9d88279b63a9a47a4b057dc524716b5a151598d88e04a703dbd66aa6f8e4805707a6d2f15820f0b2daff5a3bb62b354e5febef478dc06ee7c76860c9776fc6f7bc70a6e5cd047e63a665878bed7aa5e12dcdacb86163d1b4dd9986e786bed9080746807bc7d4dbb663a590587143c7ae5716a9f6f0f7bbb6ec4bfaa1b61d596940a115088514f2b7c14456db29c4a2ca5fee5e164ce57f85a1306a69a1500ff3f7e980a13d79e339c15afd4084bdcd9818d78e08fde7e221f53db1e7b0d87d5d6455fe4ee7b2104789efa6e02aef2986c253b0cb0a13ba7644186acea0f4bf740c2166e3745de52f288630d4cf8a71755a18af8a59f5b298b82ef426a5bed569a699bff121e61723e69d624afd2365ffa963088dbfce2a82abd7f97b970c2154fe0ec8f93d4604d7d72ce7aa3258ce947a531886d85511733789e90f1d4370fe06aba8fcdd4b87fb349cff88dd8c04649484644230ed48ae958b372a72d37bcd35269876408cfc5d30be5a698991bf09c62f56ce8b9196d0d58a18690aa6b687a048509189a2b6536c537f20f466864542d0ecef5546a187b5d91882e88bc127a812f70e8b221fbd25180f2b2d51e43a99ed0a59cd0d088b2a2f19e2fe79c1be35a4a50f10df11d1b60e0b8ddf475cb2d2121a9f22b35921ab29b87a35decf9f712d793982d06f38a6db3256a41fd89e6b1ca8cc56668ddda1df76cf1b7bf7ed79647ef6e1ffbfdd67eed6e1f7cc88f8f4d558347d9896e5cb20c05d8fb58ee7b68cb61bd82d575a86ed8668db6eb8770ea7e585b6ed4b343cd7b2a3d4da71cf73b014b41084beedb6705eaeced79d59e7fce223f05c67f5b1a8eeba43f7d9b9fdf367cca63cd57622f2b9fdf303df27ed95817da65d1fd855cb4abdea587350dff098be8a6770118308f05b9671cd25c97ec9c6905c76d8ba7b8ef2e12b0e4f6e3799d4c546dce94ea30eaf33d9f826932bd66a4f9bc152ad613a4ead117a7e30b2ee26a2a52e22fa9a7bc8e886d7903799ffd457cbb4a0f2c1f290a23c5d6e786e109a6e583ed8349d404e976d77b91d06e5834f9d9b2e7bed7038095797091d01fc36092c5f9a1e90a6b56c483b403452e90977dc4365cab6e433d24ad097ee22a599ec4a5ac746bbb04657e8b7efbada015becba2781eb349debfd170000ffff', 
     	gas: '4000000'
    }, function (e, contract){
    	console.log(e, contract);
    	if (typeof contract.address !== 'undefined') {
        	console.log('Contract address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
   	 	}
 	})
	