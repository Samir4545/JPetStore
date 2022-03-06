Dim jBrowser, jPage
Set jBrowser= Browser("name:=JPetStore Demo")
Set jPage=Page("title:=JPetStore Demo")
URL="https://jpetstore.aspectran.com/catalog"
SystemUtil.Run "Chrome",URL
DataTable.ImportSheet "S:\JPetStore\Test Data\SignUp.xlsx", "Sheet1", "Global"
'----------------------------Start "Search Transaction"--------------------------
Services.StartTransaction "Checkout"
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").Link("name:=Proceed to Checkout").Click

'----------------------------End "Search Transaction"--------------------------
Services.EndTransaction "Checkout"
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebList("name:=cardType").Set "Visa"
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("type:=text").Set DataTable("CardNumber", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=expiryDate").Set DataTable("ExpirayDate", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billToFirstName").Set DataTable("Firstname", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billToLastName").Set DataTable("Lastname", dtGlobalSheet)
'----------------------------Start "Search Transaction"--------------------------
Services.StartTransaction "Address"
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billAddress1").Set DataTable("Address1", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billAddress2").Set DataTable("Address2", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billCity").Set DataTable("City", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billState").Set DataTable("State", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billZip").Set DataTable("Zip", dtGlobalSheet)
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebEdit("name:=billCountry").Set DataTable("Countary", dtGlobalSheet)
'----------------------------End "Search Transaction"--------------------------
Services.EndTransaction "Address"
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebButton("name:=Continue").Click
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebElement("visible:=True").MessageBox
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebButton("class:=button").Click
Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").WebElement("visible:=True").MessageBox




'---------------------------Text CheckPoint-----------------------
Browser("JPetStore Demo_3").Page("JPetStore Demo").Check CheckPoint("Order Date")
Browser("JPetStore Demo_2").Page("JPetStore Demo").Check CheckPoint("Thank you")

'------------------Sync Point-------------------
Browser("JPetStore Demo_4").Page("JPetStore Demo").WebButton("Update Cart").WaitProperty "visible", True, 2000
'--------------------------------ExportingExcelSheet-------------------------------------
DataTable.ExportSheet  "S:\JPetStore\Test Data\SignupModuleExport.xlsx", "Global", "sheet1"
