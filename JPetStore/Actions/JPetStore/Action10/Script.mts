'------------------------------------Search Module----------------------------
'-------------------------Invoking Website-------------------------
'Dim jBrowser, jPage, c
'Set jBrowser= Browser("name:=JPetStore Demo.*")
'Set jPage=Page("title:=JPetStore Demo.*")
'URL="https://jpetstore.aspectran.com"
'SystemUtil.Run "Chrome",URL
'
'----------------------------Start "Search Transaction"--------------------------
Services.StartTransaction "SearchItem"

Browser("JPetStore Demo").Page("JPetStore Demo").WebArea("Birds").WaitProperty "visible", True, 2000'--------------------Sync Point @@ script infofile_;_ZIP::ssf14.xml_;_

'---------------------------------Importing External ExcelSheet-------------------------------
DataTable.ImportSheet "S:\JPetStore\Test Data\Search.xlsx", "sheet1", "Global"

'----------------------------------------------Search Module------------------------------------------------
With Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*")
	.WebEdit("name:=keyword","placeholder:=Product Search").Set DataTable("Product_Search", dtGlobalSheet)
	.WebButton("innertext:=Search").Click
End With

With Browser("JPetStore Demo_4").Page("JPetStore Demo")
	a = .WebElement("Bulldog").GetROProperty("innertext")
	'msgbox a
	.WebElement("Bulldog").WaitProperty "innertext", "Bulldog", 3000'----------Sync Point
End With

'----------------------------End "Search Transaction"--------------------------
Services.EndTransaction "SearchItem"

'----------------------------Start "SelectingItem Transaction"--------------------------
Services.StartTransaction "SelectingItem"
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("name:=K9-BD-01").Click

'----------------------------End "SelectingItem Transaction"--------------------------
Services.EndTransaction "SelectingItem"

'----------------------------Start "SelectingType Transaction"--------------------------
Services.StartTransaction "SelectingType"

Browser("JPetStore Demo").Page("JPetStore Demo_4").Image("logo-topbar").WaitProperty "visible", True, 3000'------------Sync Point
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("name:=EST-6").Click
With Browser("JPetStore Demo").Page("JPetStore Demo_2")
	.WebElement("Friendly dog from England").WaitProperty "visible", True, 3000'----------Sync Point

	'-------------------------------------------------Standard Output Checkpint-----------------------------------------

	.WebElement("Bulldog").Output CheckPoint("Bulldog_2")
	.WebElement("Male Adult Bulldog").Output CheckPoint("Male Adult Bulldog_2") @@ script infofile_;_ZIP::ssf10.xml_;_
	b = .WebElement("Friendly dog from England").GetROProperty("innertext")
	.WebElement("Friendly dog from England").Output CheckPoint("Friendly dog from England") @@ script infofile_;_ZIP::ssf11.xml_;_
	.WebElement("9907 in stock.").Output CheckPoint("9907 in stock._2")'---------------Added Regular Expressions @@ script infofile_;_ZIP::ssf12.xml_;_
	.WebElement("$18.50").Output CheckPoint("$18.50_2") @@ script infofile_;_ZIP::ssf13.xml_;_
End With

c = a& space(1) &b
 reporter.ReportEvent micDone , "SearchResult" ," Bulldog is a Friendly Dog from England"
msgbox c
'------------------------------------------------------AddToCard----------------------------------------------

Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo").Link("name:=Add to Cart").Click

'----------------------------End "SelectingType Transaction"--------------------------
Services.EndTransaction "SelectingType" @@ script infofile_;_ZIP::ssf23.xml_;_

'--------------------------------ExportingExcelSheet-------------------------------------
DataTable.ExportSheet "S:\JPetStore\Test Data\SearchmoduleExport.xlsx", "Global", "sheet1"

'--------------------------------------Reporting Event-------------------------------------------
reporter.ReportEvent micDone , "Script Run Successfully", "Finish the scope of Search Module"



