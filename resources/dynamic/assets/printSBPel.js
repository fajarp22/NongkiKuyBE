module.exports = (data) => {
  return `
	 
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	   <head>
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		  <title>Surat Bukti Gadai</title>
		  <style type="">
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
			 text-align: left;
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
			 text-align: left;
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
		  </style>
	   </head>
	   <body>
		  <div class="page-wrap">
			 <table>
				<tr>
				   <td>
					  <img class="logo" alt="RUMAH GADAI" src="${data.logo_rg}" />
				   </td>
				   <td width="100%" valign="top" align="center">
					  <h2>BUKTI PELUNASAN ${data.status}</h2>
					  <br />
					  <h3><u>No. SBG: ${data.mortgageCode}</u></h3>
					  <h3><u>Cabang: ${data.branchName}</u></h3>
					  Tanggal/jam: ${data.dateHour}
				   </td>
				   <td valign="top" align="right">
					  <img class="logo-ojk" alt="OJK" src="${data.logo_ojk}" />
				   </td>
				</tr>
			 </table>
			 <br />
			 <table border="1" cellspacing="10px" class="larger">
				<tr>
				   <td width="25%" align="right">Nama Barang</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.itemName}</td>
				</tr>
				<tr>
				   <td width="25%" align="right">Pinjaman Pokok Terakhir</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.paymentLatest}</td>
				</tr>
				<tr>
				   <td width="25%" align="right">Jumlah yang dibayar</td>
				   <td width="2%">:</td>
				   <td width="73%">
					  ${data.paymentValue}
				   </td>
				</tr>
				<tr>
				   <td width="25%" align="right">Tarif Sewa Modal</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.serviceInterest}</td>
				</tr>
				<tr>
				${
          data.status
            ? ` <td width="25%" align="right">Sisa Pinjaman Pokok</td>
							  <td width="2%">:</td>
							  <td width="73%">${data.serviceReceived}</td>`
            : ``
        }
				</tr>
				<tr>
				   ${
             data.status
               ? `
				   <td width="25%" align="right">Tanggal Jatuh Tempo</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.dueDate}</td>
				   `
               : ``
           }
				</tr>
				<tr>
				   <td><br /></td>
				</tr>
				<tr>
				   <td colspan="3">
					  <b>NOTA TRANSAKSI INI MERUPAKAN BUKTI YANG TIDAK TERPISAHKAN DARI SBG.</b>
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
					  </table>
				   </td>
				</tr>
			 </table>
			 <br />
			 <hr style="border-top: dashed 1px" />
			 <br /><br />
			 <table>
				<tr>
				   <td>
					  <img class="logo" alt="RUMAH GADAI" src="${data.logo_rg}" />
				   </td>
				   <td width="100%" valign="top" align="center">
					  <h2>BUKTI PELUNASAN ${data.status}</h2>
					  <br />
					  <h3><u>No. SBG: ${data.mortgageCode}</u></h3>
					  <h3><u>Cabang: ${data.branchName}</u></h3>
					  Tanggal/jam: ${data.dateHour}
				   </td>
				   <td valign="top" align="right">
					  <img class="logo-ojk" alt="OJK" src="${data.logo_ojk}" />
				   </td>
				</tr>
			 </table>
			 <br />
			 <table border="1" cellspacing="10px" class="larger">
				<tr>
				   <td width="25%" align="right">Nama Barang</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.itemName}</td>
				</tr>
				<tr>
				   <td width="25%" align="right">Pinjaman Pokok Terakhir</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.paymentLatest}</td>
				</tr>
				<tr>
				   <td width="25%" align="right">Jumlah yang dibayar</td>
				   <td width="2%">:</td>
				   <td width="73%">
					  ${data.paymentValue}
				   </td>
				</tr>
				<tr>
				   <td width="25%" align="right">Tarif Sewa Modal</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.serviceInterest}</td>
				</tr>
				<tr>
				${
          data.status
            ? ` <td width="25%" align="right">Sisa Pinjaman Pokok</td>
					<td width="2%">:</td>
					<td width="73%">${data.serviceReceived}</td>`
            : ``
        }
				</tr>
				<tr>
				   ${
             data.status
               ? `
				   <td width="25%" align="right">Tanggal Jatuh Tempo</td>
				   <td width="2%">:</td>
				   <td width="73%">${data.dueDate}</td>
				   `
               : ``
           }
				</tr>
				<tr>
				   <td><br /></td>
				</tr>
				<tr>
				   <td colspan="3">
					  <b>NOTA TRANSAKSI INI MERUPAKAN BUKTI YANG TIDAK TERPISAHKAN DARI SBG.</b>
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
					  </table>
				   </td>
				</tr>
			 </table>
		  </div>
	   </body>
	</html>
	`;
};
