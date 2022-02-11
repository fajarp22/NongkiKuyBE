module.exports = (data) => {
  return `
<!-- //   -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

		<title>Surat Bukti Gadai</title>
		<style type="">

      @page {
        size: A4;
      }
			#hiderow,
			.delete {
				display: none;
			}
			* {
				margin: 0;
				padding: 0;
			}
			body {
				font: 12px Helvetica, Sans-Serif;
				text-align: justify;
				text-justify: inter-word;
			}
			.page-wrap {
				width: 800px;
				margin: 0 auto;
			}

			textarea {
				border: 0;
				font: 12px Helvetica, Sans-Serif;
				overflow: hidden;
				resize: none;
				text-align: justify;
				text-justify: inter-word;
			}
			table {
				border-collapse: inherit;
			}
			table td,
			table th {
				border: 1px solid black;
				padding: 2px;
			}

			#header {
				height: 15px;
				width: 100%;
				margin: 20px 0;
				background: #222;
				text-align: center;
				color: white;
				font: bold 15px Helvetica, Sans-Serif;
				text-decoration: uppercase;
				letter-spacing: 20px;
				padding: 8px 0px;
			}

			#address {
				width: 250px;
				height: 150px;
				float: left;
			}
			#customer {
				overflow: hidden;
			}

			#logo {
				text-align: right;
				float: right;
				position: relative;
				margin-top: 25px;
				border: 1px solid #fff;
				max-width: 540px;
				max-height: 100px;
				overflow: hidden;
			}
			#logo:hover,
			#logo.edit {
				border: 1px solid #000;
				margin-top: 0px;
				max-height: 125px;
			}
			#logoctr {
				display: none;
			}
			#logo:hover #logoctr,
			#logo.edit #logoctr {
				display: block;
				text-align: right;
				line-height: 25px;
				background: #eee;
				padding: 0 5px;
			}
			#logohelp {
				text-align: left;
				display: none;
				font-style: italic;
				padding: 10px 5px;
			}
			#logohelp input {
				margin-bottom: 5px;
			}
			.edit #logohelp {
				display: block;
			}
			.edit #save-logo,
			.edit #cancel-logo {
				display: inline;
			}
			.edit #image,
			#save-logo,
			#cancel-logo,
			.edit #change-logo,
			.edit #delete-logo {
				display: none;
			}
			#customer-title {
				font-size: 20px;
				font-weight: bold;
				float: left;
				text-align: justify;
				text-justify: inter-word;
			}

			#meta {
				margin-top: 1px;
				width: 300px;
				float: right;
			}
			#meta td {
				text-align: right;
			}
			#meta td.meta-head {
				text-align: justify;
				text-justify: inter-word;
				background: #eee;
			}
			#meta td textarea {
				width: 100%;
				height: 20px;
				text-align: right;
			}

			#items {
				clear: both;
				width: 100%;
				margin: 30px 0 0 0;
				border: 1px solid black;
			}
			#items th {
				background: #eee;
			}
			#items textarea {
				width: 80px;
				height: 50px;
				text-align: justify;
				text-justify: inter-word;
			}
			#items tr.item-row td {
				border: 0;
				vertical-align: top;
			}
			#items td.description {
				width: 300px;
			}
			#items td.item-name {
				width: 175px;
			}
			#items td.description textarea,
			#items td.item-name textarea {
				width: 100%;
			}
			#items td.total-line {
				border-right: 0;
				text-align: right;
			}
			#items td.total-value {
				border-left: 0;
				padding: 10px;
			}
			#items td.total-value textarea {
				height: 20px;
				background: none;
			}
			#items td.balance {
				background: #eee;
			}
			#items td.blank {
				border: 0;
			}

			#terms {
				text-align: center;
				margin: 20px 0 0 0;
			}
			#terms h5 {
				text-transform: uppercase;
				font: 13px Helvetica, Sans-Serif;
				letter-spacing: 10px;
				border-bottom: 1px solid black;
				padding: 0 0 8px 0;
				margin: 0 0 8px 0;
			}
			#terms textarea {
				width: 100%;
				text-align: center;
			}

			textarea:hover,
			textarea:focus,
			#items td.total-value textarea:hover,
			#items td.total-value textarea:focus,
			.delete:hover {
				background-color: #eeff88;
			}

			.delete-wpr {
				position: relative;
			}
			.delete {
				display: block;
				color: #000;
				text-decoration: none;
				position: absolute;
				background: #eeeeee;
				font-weight: bold;
				padding: 0px 3px;
				border: 1px solid;
				top: -6px;
				left: -22px;
				font-family: Verdana;
				font-size: 12px;
			}

			.logo {
				width: 85px;
			}

			.logo-ojk {
				width: 125px;
			}

			table {
				width: 100%;
			}

			table tr th {
				border: 0;
				background: #eee;
				text-align: justify;
				text-justify: inter-word;
			}

			table tr td,
			table tr th {
				border: 0;
			}

			table.larger {
				font-size: 14px;
			}

			.filling {
				border-bottom: solid 1px;
				min-width: 50px;
			}

			.filling-wide {
				border-bottom: solid 1px;
				min-width: 150px;
			}

			.field {
				width: 200px;
			}

			textarea {
				width: 100%;
			}

			#tnc {
				font-size: 12px;
			}
			p {
				margin: 0px 15px;
			}

			ol li {
				margin: 0px 15px;
			}

			.capitalize {
				text-transform: capitalize;
			}

			.sideBorder {
				border-left: solid 1px;
				padding-left: 20px;
			}

			.page-wrap2 {
				width: 800px;
				margin: 0 auto;
				font: 15px Helvetica, Sans-Serif;
			}
			.page-wrap2 table {
				border-collapse: inherit;
				width: 100%;
			}
			table.title tr th {
				text-align: center;
			}
			table.data tr th {
				text-align: justify;
				text-justify: inter-word;
			}
			table.data tr th h3 {
				font-weight: 400;
			}
			table.data tr td:first-child {
				width: 30%;
			}
			table.description tr td p {
				line-height: 1.5;
				text-align: justify;
			}
			table.description tr td p .underline {
				font-weight: 600;
				text-decoration: underline;
			}
		</style>
	</head>
	<body>
		<div class="page-wrap">
			<table>
				<tbody>
					<tr>
						<td>
							<img class="logo" alt="RUMAH GADAI" src="${data.logo_rg}" />
						</td>
						<td width="100%" valign="top" align="center">
							<h2>SURAT BUKTI GADAI</h2>
							<br />
							<h3><u>No. SBG: ${data.mortgageCode}</u></h3>
							<h3><u>Cabang: ${data.branchName}</u></h3>
							Tanggal/jam: ${data.dateHour}
						</td>
						<td valign="top" align="right">
							<img class="logo-ojk" alt="OJK" src="${data.logo_ojk}" />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table>
				<tbody>
					<tr>
						<th colspan="7" class="meta-head">KETERANGAN NASABAH</th>
					</tr>
					<tr>
						<td class="field">Nama Lengkap (sesuai identitas)</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.customerName}</td>
					</tr>
					<tr>
						<td class="field">No. (KTP/SIM/Passport)</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.customerIdentity}</td>
					</tr>
					<tr>
						<td class="field">Alamat saat ini</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.currentAddress}</td>
					</tr>
					<tr>
						<td colspan="2" class="blank"></td>
						<td>Kelurahan</td>
						<td class="filling">${data.currentVillage}</td>
						<td></td>
						<td>Kecamatan</td>
						<td class="filling">${data.currentDistrict}</td>
					</tr>
					<tr>
						<td colspan="2" class="blank"></td>
						<td>Kota</td>
						<td class="filling">${data.currentRegency}</td>
						<td></td>
						<td>Provinsi</td>
						<td class="filling">${data.currentProvince}</td>
					</tr>
					<tr>
						<td class="field">No. Tlp. Rumah (aktif)</td>
						<td width="1%">:</td>
						<td colspan="2" class="filling">${data.noTelp}</td>
						<td></td>
						<td>No HP (aktif)</td>
						<td class="filling">${data.noPhone}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table>
				<tbody>
					<tr>
						<th colspan="7" class="meta-head">KETERANGAN BARANG JAMINAN</th>
					</tr>
					<tr>
						<td class="field">Jenis Barang</td>
						<td width="1%">:</td>
						<td colspan="2" class="filling">${data.itemCategory}</td>
						<td></td>
						<td>Merk/Tipe</td>
						<td class="filling-wide">${data.itemName}</td>
					</tr>
					<tr>
						<td class="field">Tahun Pembuatan</td>
						<td width="1%">:</td>
						<td colspan="2" class="filling">${data.productionYear}</td>
						<td></td>
						<td>No. Serial</td>
						<td class="filling-wide">${data.serialNo}</td>
					</tr>
					<tr>
						<td class="field">Kelengkapan</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.appraisal}</td>
					</tr>
					<tr>
						<td class="field">Keterangan</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.description}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table>
				<tbody>
					<tr>
						<th colspan="7" class="meta-head">KETERANGAN PINJAMAN</th>
					</tr>
					<tr>
						<td class="field">Perhitungan Jasa Tarif Sewa Modal</td>
						<td width="1%">:</td>
						<td class="filling">${data.servicePercentage}</td>
						<td></td>
						<td width="150px">Tanggal Jatuh Tempo</td>
						<td class="filling-wide" colspan="2">${data.dueDate}</td>
					</tr>
					<tr>
						<td class="field">Jumlah Pinjaman</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.serviceReceived}</td>
					</tr>
					<tr>
						<td class="field">Total Jasa Tarif Sewa Modal</td>
						<td width="1%">:</td>
						<td colspan="5" class="filling">${data.serviceInterest}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table id="tnc">
				<tbody>
					<tr">
						<td style="font-size: 11.5px;" valign="top" width="51%">
							<h3><u>PERJANJIAN UTANG PIUTANG DENGAN GADAI BARANG:</u></h3>
							<p>
								Kami yang bertanda tangan dibawah ini, Rumah Gadai dan Nasabah
								(Pemilik/Kuasa dari pemilik barang jaminan) bersama ini sepakat membuat
								perjanjian utang piutang sebagai berikut:
							</p>
							<br />
							<ol>
								<li>
									Nasabah telah menerima dan menyetujui uraian barang jaminan, besarnya
									nilai tansaksi, tarif sewa modal dan biaya administrasi sebagaimana
									yang dimaksud.
								</li>
								<li>
									Nota transaksi sebagai tanda bukti yang sah penerimaan uang pinjaman.
								</li>
								<li>
									Barang yang diserahkan sebagai jaminan adalah milik nasabah dan bukan
									berasal dari hasil kejahatan, tidak dalam objek sengketa dan
									membebaskan Rumah Gadai dari segala tuntutan dan gugatan dari pihak
									manapun.
								</li>
								<li>
									Rumah Gadai akan memberikan ganti rugi apabila barang jaminan yang
									berada dalam penguasaan Rumah Gadai mengalami kehilangan yang tidak
									disebabkan oleh suatu bencana alam (Force Majeure) yang ditetapkan
									pemerintah. Ganti rugi diberikan setelah diperhitungkan dengan uang
									pinjaman dan sewa modal dan akan diganti dengan barang yang memiliki
									manfaat yang sama atau maksimal sebesar nilai taksiran barang pinjaman.
								</li>
								<li>
								Apabila sampai dengan tanggal jatuh tempo, Nasabah tidak melunasi atau ulang gadai tetapi memberikan konfirmasi transaksi maka diberikan waktu paling lambat 5 hari setelah tanggal jatuh tempo untuk melakukan transaksi, untuk Nasabah yang tidak memberikan konfirmasi hingga tanggal jatuh tempo, maka Nasabah memberi persetujuan kepada Rumah Gadai untuk dilakukan penjualan barang jaminan secara di bawah tangan atau barang jaminan dijual bersama dengan Rumah Gadai. Sisa hasil penjualan setelah dipotong biaya yang muncul pada saat penjualan bersama maka selebihnya akan dikembalikan kepada Nasabah.
								</li>
								<li>
									Nasabah menyetujui (apabila) nilai pinjaman yang diterima lebih rendah
									dari nilai minimum perbandingan uang pinjaman dengan nilai taksiran
									barang jaminan.
								</li>
								<li>
									Nasabah dapat mengangsur pokok pinjaman dan atau ulang gadai dengan
									membayar tarif sewa modal, cicilan/angsuran, administasi di kantor
									cabang Rumah Gadai.
								</li>
								<li>
									Apabila terjadi perselisihan dikemudian hari, maka mekanisme penanganan
									pengaduan dilaporkan kepada Rumah Gadai dan penyelesaian sengketa dapat
									diselesaikan dengan musyawarah dan apabila tidak tercapai kesepakatan
									maka akan diselesaikan melalui Pengadilan Negeri setempat.
								</li>
							</ol>
						</td>
						<td valign="top" width="49%" class="sideBorder">
							<h3><u>PERHATIAN:</u></h3>
							<ol>
								<li>
									Jasa tarif sewa modal sebesar 5 (Lima) persen untuk per 15 hari.
								</li>
								<li>Semua barang jaminan diasuransikan senilai jumlah pinjaman.</li>
								<li>
									Biaya Administrasi sebesar minimal _____________________ atau ____ dari
									nominal pinjaman.
								</li>
								<li>
									Rumah Gadai tidak menerima pembayaran melalui titipan uang kepada
									petugas yang bertugas diluar kantor.
								</li>
								<li>
									Pembayaran yang Sah hanya dilakukan di kantor cabang/unit layanan Rumah
									Gadai secara tunai atau transfer dengan bukti transfer.
								</li>
								<li>
									Pelunasan dilakukan oleh Nasabah dengan membawa Surat Bukti Gadai dan
									KTP atau Surat Kuasa bermaterai dari Nasabah dan KTP penerima kuasa.
								</li>
								<li>
									Nasabah wajib tunduk pada ketentuan perjanjian gadai Rumah Gadai.
								</li>
							</ol>
							<br />
							<table>
								<tbody>
									<tr>
										<td align="center"><b>Tanda Tangan Nasabah</b></td>
										<td align="center"><b>Tanda Tangan Petugas</b></td>
									</tr>
									<tr>
										<td colspan="2"><br /><br /><br /></td>
									</tr>
									<tr>
										<td align="center">${data.customerName}</td>
										<td align="center"><span class="capitalize">${data.staffName}</span></td>
									</tr>
								</tbody>
							</table>
							<br />
							<table>
								<tbody>
									<tr>
										<th colspan="4" class="meta-head" align="center">PEMBERIAN KUASA</th>
									</tr>
									<tr>
										<td colspan="4">
											Bersama ini saya memberikan kuasa untuk Pelunasan dan Menerima Barang
											Jaminan kepada:
										</td>
									</tr>
									<tr>
										<td colspan="4">
											Nama................................................................................................
										</td>
									</tr>
									<tr>
										<td colspan="4">
											Alamat..............................................................................................
										</td>
									</tr>
									<tr>
										<td colspan="4"></td>
									</tr>
									<tr>
										<td align="center" width="50%"><b>Pemberi Kuasa</b></td>
										<td colspan="2"></td>
										<td align="center" width="50%"><b>Penerima Kuasa</b></td>
									</tr>
									<tr>
										<td colspan="4"><br /><br /><br /></td>
									</tr>
									<tr>
										<td align="center" class="filling"></td>
										<td colspan="2"></td>
										<td align="center" class="filling"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="page-wrap" style="margin-top: 1000px">
			<table>
				<tbody>
					<tr>
						<td>
							<img class="logo" alt="RUMAH GADAI" src="${data.logo_rg}" />
						</td>
						<td width="100%" valign="top" align="center">
							<h2>BUKTI PENCAIRAN</h2>
							<br />
							<h3><u>No. SBG: ${data.mortgageCode}</u></h3>
							<h3><u>Cabang: ${data.branchName}</u></h3>
							Tanggal/jam: ${data.dateHour}
						</td>
						<td valign="top" align="right">
							<img class="logo-ojk" alt="OJK" src="${data.logo_ojk}" />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table border="1" cellspacing="10px" class="larger">
				<tbody>
					<tr>
						<td width="20%" align="right">Nama Barang</td>
						<td width="2%">:</td>
						<td width="78%">${data.itemName}</td>
					</tr>
					<tr>
						<td width="20%" align="right">Jumlah yang dicairkan</td>
						<td width="2%">:</td>
						<td width="78%">${data.serviceReceived}</td>
					</tr>
					<tr>
						<td width="20%" align="right">Tarif Sewa Modal</td>
						<td width="2%">:</td>
						<td width="78%">${data.serviceInterest}</td>
					</tr>
					<tr>
						<td width="20%" align="right">Tanggal Jatuh Tempo</td>
						<td width="2%">:</td>
						<td width="78%">${data.dueDate}</td>
					</tr>
					<tr>
						<td><br /></td>
					</tr>
					<tr>
						<td colspan="3">
							<b
								>NOTA TRANSAKSI INI MERUPAKAN BUKTI YANG TIDAK TERPISAHKAN DARI SBG.</b
							>
							<br />
							Saya telah mengerti atas penjelasan dan menyetujui persyaratan yang telah
							disampaikan oleh petugas.
							<br />
							Terima Kasih atas kepercayaan Anda.
						</td>
					</tr>
					<tr>
						<td><br /></td>
					</tr>
					<tr>
						<td colspan="3">
							<table>
								<tbody>
									<tr>
										<td align="center"><b>Tanda Tangan Nasabah</b></td>
										<td align="center"><b>Tanda Tangan Petugas</b></td>
									</tr>
									<tr>
										<td><br /><br /><br /></td>
									</tr>
									<tr>
										<td align="center">${data.customerName}</td>
										<td align="center"><span class="capitalize">${data.staffName}</span></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			<br /><br /><br /><br />
			<hr style="border-top: dashed 1px" />
			<br /><br />
			<table>
				<tbody>
					<tr>
						<td>
							<img class="logo" alt="RUMAH GADAI" src="${data.logo_rg}" />
						</td>
						<td width="100%" valign="top" align="center">
							<h2>BUKTI PENCAIRAN</h2>
							<br />
							<h3><u>No. SBG: ${data.mortgageCode}</u></h3>
							<h3><u>Cabang: ${data.branchName}</u></h3>
							Tanggal/jam: ${data.dateHour}
						</td>
						<td valign="top" align="right">
							<img class="logo-ojk" alt="OJK" src="${data.logo_ojk}" />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table border="1" cellspacing="10px" class="larger">
				<tbody>
					<tr>
						<td width="20%" align="right">Nama Barang</td>
						<td width="2%">:</td>
						<td width="78%">${data.itemName}</td>
					</tr>
					<tr>
						<td width="20%" align="right">Jumlah yang dicairkan</td>
						<td width="2%">:</td>
						<td width="78%">${data.serviceReceived}</td>
					</tr>
					<tr>
						<td width="20%" align="right">Tarif Sewa Modal</td>
						<td width="2%">:</td>
						<td width="78%">${data.serviceInterest}</td>
					</tr>
					<tr>
						<td width="20%" align="right">Tanggal Jatuh Tempo</td>
						<td width="2%">:</td>
						<td width="78%">${data.dueDate}</td>
					</tr>
					<tr>
						<td><br /></td>
					</tr>
					<tr>
						<td colspan="3">
							<b
								>NOTA TRANSAKSI INI MERUPAKAN BUKTI YANG TIDAK TERPISAHKAN DARI SBG.</b
							>
							<br />
							Saya telah mengerti atas penjelasan dan menyetujui persyaratan yang telah
							disampaikan oleh petugas.
							<br />
							Terima Kasih atas kepercayaan Anda.
						</td>
					</tr>
					<tr>
						<td><br /></td>
					</tr>
					<tr>
						<td colspan="3">
							<table>
								<tbody>
									<tr>
										<td align="center"><b>Tanda Tangan Nasabah</b></td>
										<td align="center"><b>Tanda Tangan Petugas</b></td>
									</tr>
									<tr>
										<td><br /><br /><br /></td>
									</tr>
									<tr>
										<td align="center">${data.customerName}</td>
										<td align="center"><span class="capitalize">${data.staffName}</span></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="page-wrap2" style="margin-top: 1000px">
			<table class="title">
				<tbody>
					<tr>
						<th valign="top" style="background: none">
							<h3>KETERANGAN TAMBAHAN BARANG JAMINAN</h3>
						</th>
					</tr>
				</tbody>
			</table>
			<br />
			<table class="data">
				<tbody>
					<tr>
						<td>Nilai Taksiran</td>
						<td width="1%">:</td>
						<td>${data.serviceLimit}</td>
					</tr>
					<tr>
						<td>Nilai Pinjaman</td>
						<td width="1%">:</td>
						<td>${data.serviceReceived}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table class="description">
				<tbody>
					<tr>
						<td>
							Nasabah menyetujui (apabila) nilai pinjaman yang diterima lebih rendah dari nilai minimum perbandingan uang pinjaman dengan nilai taksiran barang jaminan.
							<br />
							<br />
						</td>
					</tr>
					<tr>
						<td>
							..............................., ${data.dateOnly}
						</td>
					</tr>
					<tr>
						<td><br /><br /><br /></td>
					</tr>
					<tr>
						<td>(.......................................................)</td>
					</tr>
				</tbody>
			</table>
			<br /><br />
			<table class="title">
				<tbody>
					<tr>
						<th valign="top" style="background: none">
							<h3>SURAT PERNYATAAN</h3>
						</th>
					</tr>
				</tbody>
			</table>
			<br />
			<table class="data">
				<tbody>
					<tr>
						<th colspan="7" style="background: none">
							<h3>Yang bertandatangan di bawah ini :</h3>
						</th>
					</tr>
					<tr>
						<td>Nama</td>
						<td width="1%">:</td>
						<td>${data.customerName}</td>
					</tr>
					<tr>
						<td>Alamat</td>
						<td width="1%">:</td>
						<td>${data.currentAddress}</td>
					</tr>
					<tr>
						<td>No. (KTP/SIM/NPWP)</td>
						<td width="1%">:</td>
						<td>${data.customerIdentity}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table class="description">
				<tbody>
					<tr>
						<td colspan="2">
							Menyatakan bahwa:
							<ol type="1">
								<li>
									Benar telah menggadaikan barang di Rumah Gadai berupa

									<span class="underline">${data.itemName}</span>, berdasarkan SBG Nomor
									<span class="underline">${data.mortgageCode}</span> tertanggal ${data.dateOnly}.
									Barang tersebut di atas adalah milik saya pribadi dan bukan merupakan
									barang curian / hasil kejahatan serta tidak dalam obyek sengketa.
								</li>
								<br />
								<li>
									Menyetujui apabila pinjaman telah lewat dari tanggal jatuh tempo pinjaman dan tidak ada konfirmasi maka barang jaminan tersebut akan dilakukan penjualan kepada pembeli yang sudah ditunjuk oleh PT. Rumah Gadai Jabar dan dilakukan biaya administrasi sebesar Rp. 50.000,-.
								</li>
								<br />
								<li>
									Uang kelebihan penjualan bersama dinyatakan kedaluwarsa apabila telah melebihi jangka waktu 1 (satu) tahun sejak tanggal pemberitahuan kepada nasabah, selanjutnya uang kelebihan dimaksud akan diberikan kepada dana kepedulian sosial atau sejenisnya.
								</li>
								<br />
								<li>
									Rumah Gadai tidak bertanggung jawab apabila terjadi kerusakan software pada barang jaminan nasabah, karena barang jaminan telah disegel pada awal gadai.
								</li>
								<br />
								<li>
									Bersedia mematuhi ketentuan Rumah Gadai dalam hal ulang
									gadai/perpanjangan jangka waktu gadai sebagai berikut:
									<ol type="a">
										<li>
											Apabila pinjaman saya tersebut telah dilakukan ulang gadai hingga 3
											(tiga) kali, maka saat ulang gadai yang ke 4 (empat) saya bersedia
											mengikuti taksiran harga barang jaminan tersebut diatas menurut
											ketentuan Rumah Gadai.
										</li>
										<li>
											Apabila taksiran barang tersebut mengalami penurunan,maka saya bersedia melakukan pelunasan sebagian.
										</li>
										<li>
											Apabila saya tidak dapat memenuhi kekurangan/pelunasan sebagian
											tersebut pada butir (b) maka saya bersedia untuk menjual barang
											jaminan bersama-sama sesuai prosedur yang berlaku di Rumah Gadai.
										</li>
									</ol>
								</li>
							</ol>
							<br />
							<p>
								Demikian surat pernyataan ini dibuat dengan sebenar-benarnya agar dapat
								dipergunakan sebagaimana mestinya dan membebaskan Rumah Gadai dari
								segala tuntutan dan gugatan dari pihak manapun.
							</p>
							<br />
						</td>
					</tr>
					<tr>
						<td>
							..............................., ${data.dateOnly}
						</td>
						<td width="50%" style="font-size: 11.5px;">
							Untuk peningkatan pelayanan nasabah, setiap pertanyaan, saran dan keluhan nasabah dapat menghubungi layanan customer service.
						</td>
					</tr>
					<tr>
						<td><br /><br /><br />(.......................................................)</td>
						<td align="right"> <img src="https://rumahgadai.s3.ap-southeast-1.amazonaws.com/logo-cs.png" height="100px"> </td>
					</tr>
				</tbody>
			</table>
		</div>
	</body>
</html>
`;
};
