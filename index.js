var AppHTML = `
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="keywords" content="Easynvest - Test Forms v1.0.0">
<meta name="description" content="Easynvest Form v1.0.0">


<title>Easynvest Form v1.0.0</title>
<!-- CSS -->
<link rel="stylesheet" type="text/css" href="./public/css/style.css">

<!-- JQuery Skills -->
<script type="text/javascript" src="./public/js/jquery.js"></script>

<!-- Form Masks -->
<script type="text/javascript" src="./public/js/jquery.mask.min.js"></script>

<!-- API para Maps -->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8AqZGEDQvRcNCofun-o3YSJXU6V9G9LE&libraries=places"></script>

<!-- JS -->
<script type="text/javascript" src="./public/js/forms.js"></script>

</head>

<body>
<header>
	<img class="img-header" src="./public/img/easynvest.png" />
	<h1>Test Form v1.0.0</h1>
</header>
<section>
	<form id="form-contato">
	</form>
	<div class="qrcode"><img src="./public/img/qrcode.png" /></div>
</section>



</body>
</html>
`

module.exports = AppHTML;