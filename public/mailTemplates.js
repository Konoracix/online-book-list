

module.exports = {
	formatCreatedBookData (createdBook, createdBookAuthorData) {

		if(!createdBook) {
			return;
		}
		return `
	
		<!DOCTYPE html>
		<html lang="pl">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>
			<link rel="preconnect" href="https://fonts.googleapis.com">
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
			<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"> 
			<style>
				body{
					font-family: 'Roboto', sans-serif;
				}
				#logo{
					color: rgb(247, 247, 247); 
					width: auto; height: 100px; 
					background-color: #343c47; 
					text-align: center; 
					padding: 20px; 
					border-radius: 5px;
				}
				#footer{
					color: rgb(247, 247, 247); 
					width: auto; 
					height: 35px; 
					background-color: #343c47; 
					text-align: center; 
					padding: 20px; 
					border-radius: 5px; margin-top: 20px;
				}
				#content{
					text-align: center;
				}
				.header{
					font-size: 35px;
					color: #d65f1a;
					margin-top: 5px;
					margin-bottom: 25px;
				}
				.propertiesList{
					margin-top: 5px;
				}
			</style>
		</head>
		<body>
			<div id="container">
				<div id="logo">
					<img src="https://github.com/Konoracix/online-book-list/blob/main/public/fire_1f525.png?raw=true" style="width: 80px; height: 80px;">
				</div>
				<div id="content"><span class="header">Pomyślnie dodano nową pozycję!</span>
				<ul class="propertiesList">
					<li>Tytuł książki: ${createdBook.title}</li>
					<li>Autor książki: ${createdBookAuthorData.name}</li>
					<li>Data utworzenia: ${createdBook.updated_at}</li>
				</ul>
				<br></div>
				<div id="footer">
					Mail send by Konoracix and Zimorodek
				</div>
			</div>
		</body>
		</html>
		</link>
		`
	}
};