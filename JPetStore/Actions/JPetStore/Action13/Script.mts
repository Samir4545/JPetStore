'Dim jBrowser, jPage
'Set jBrowser= Browser("name:=JPetStore Demo")
'Set jPage=Page("title:=JPetStore Demo")
'URL="https://jpetstore.aspectran.com/catalog"
'SystemUtil.Run "Chrome",URL
DataTable.ImportSheet "S:\JPetStore\Test Data\SignUp.xlsx", "Sheet1", "Global"
'----------------------------Start "Search Transaction"--------------------------
Services.StartTransaction "Checkout"
With Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo")
	.Link("name:=Proceed to Checkout").Click

	'----------------------------End "Search Transaction"--------------------------
	Services.EndTransaction "Checkout"
	.WebList("name:=cardType").Set "Visa"
	.WebEdit("type:=text").Set DataTable("CardNumber", dtGlobalSheet)
	.WebEdit("name:=expiryDate").Set DataTable("ExpirayDate", dtGlobalSheet)
	.WebEdit("name:=billToFirstName").Set DataTable("Firstname", dtGlobalSheet)
	.WebEdit("name:=billToLastName").Set DataTable("Lastname", dtGlobalSheet)
	'----------------------------Start "Search Transaction"--------------------------
	Services.StartTransaction "Address"
	.WebEdit("name:=billAddress1").Set DataTable("Address1", dtGlobalSheet)
	.WebEdit("name:=billAddress2").Set DataTable("Address2", dtGlobalSheet)
	.WebEdit("name:=billCity").Set DataTable("City", dtGlobalSheet)
	.WebEdit("name:=billState").Set DataTable("State", dtGlobalSheet)
	.WebEdit("name:=billZip").Set DataTable("Zip", dtGlobalSheet)
	.WebEdit("name:=billCountry").Set DataTable("Countary", dtGlobalSheet)
	'----------------------------End "Search Transaction"--------------------------
	Services.EndTransaction "Address"
	.WebButton("name:=Continue").Click
	.WebElement("visible:=True").MessageBox
	.WebButton("class:=button").Click
	.WebElement("visible:=True").MessageBox
End With


'---------------------------Text CheckPoint-----------------------
Browser("JPetStore Demo_3").Page("JPetStore Demo").Check CheckPoint("Order Date")
Browser("JPetStore Demo_2").Page("JPetStore Demo").Check CheckPoint("Thank you")

'------------------Sync Point-------------------
Browser("JPetStore Demo_4").Page("JPetStore Demo").WebButton("Update Cart").WaitProperty "visible", True, 2000
'--------------------------------ExportingExcelSheet-------------------------------------
DataTable.ExportSheet  "S:\JPetStore\Test Data\SignupModuleExport.xlsx", "Global", "sheet1"
