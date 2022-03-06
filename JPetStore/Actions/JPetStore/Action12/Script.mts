Dim GoogleBrowser,GooglePage
Set GoogleBrowser=Browser("name:=JPetStore Demo")
Set GooglePage=Page("title:=JPetStore Demo")
URL="https://jpetstore.aspectran.com/catalog/"
SystemUtil.Run "Chrome.exe", URL
'--------------------------------------------Bitmap Checkpoint---------------------------------------------------------------------
'Browser("JPetStore Demo_3").Page("JPetStore Demo").Link("Link").Check CheckPoint("Link")
'Browser("JPetStore Demo_2").Page("JPetStore Demo").Image("logo-topbar").Check CheckPoint("logo-topbar_3")
'---------------------------------Start "Sign In" Transaction----------------------------------------------------------------------
Services.StartTransaction "Signin"
With Browser("name:=JPetStore Demo").Page("title:=JPetStore Demo")
	.Link("name:=Sign In").Click
	.WebEdit("name:=username"). Set "Sohil9543"
	.WebEdit("name:=password").SetSecure "Sohil@12345"
	.WebButton("value:=Login").Click
End With
Browser("JPetStore Demo").Page("JPetStore Demo").WebElement("WelcomeContent").Output CheckPoint("WelcomeContent")
'--------------------------------------------End "Sign In" Transaction----------------------------------------------------------------------
Services.EndTransaction "Signin"
'-------------------------------------------Sync Point----------------------------------------------------------------------------------------------
'Browser("JPetStore Demo_2").Page("JPetStore Demo").Link("Sign In").WaitProperty "name", "true", 2000
'Browser("JPetStore Demo_2").Page("JPetStore Demo_2").WebButton("Login").WaitProperty "visible", true, 2000
'Browser("JPetStore Demo").Page("JPetStore Demo").WebElement("Demo Apps JPetStore Demo").WaitProperty "visible", true, 2000

'-----------------------------------------Exporting Excel Sheet--------------------------------------------------------------------------------
DataTable.ExportSheet "S:\JPetStore\Test Data\SignUpExport.xlsx", "Global","Sheet1"
'------------------------------------------------Text Check Point--------------------------------------------------------------------------------------
With Browser("JPetStore Demo_2").Page("JPetStore Demo")
	.Check CheckPoint("JPetStore Demo")
	.WebElement("JPetStore Demo JPetStore").Click
	.WebElement("WelcomeContent").Click
End With
