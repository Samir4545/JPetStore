Dim jBrowser, jPage
Set jBrowser= Browser("name:=JPetStore Demo")
Set jPage=Page("tittle:=JPetStore Demo")
URL="https://jpetstore.aspectran.com/catalog"
SystemUtil.Run "Chrome",URL

'-----------Start Transaction-------
Services.StartTransaction "Signup"


With Browser("name:=JPetStore Demo").Page("tittle:=JPetStore Demo")
	.Link("name:=Sign Up").Click
	DataTable.ImportSheet "S:\JPetStore\Test Data\SignUp.xlsx", "Sheet1", "Global"


	.WebEdit("name:=username").Set DataTable("UserID", dtGlobalSheet)
	.WebEdit("name:=password").SetSecure DataTable("Password", dtGlobalSheet)
	.WebEdit("name:=repeatedPassword").SetSecure DataTable("Password", dtGlobalSheet)

	.WebEdit("name:=firstName").Set DataTable("Firstname", dtGlobalSheet)
	.WebEdit("name:=lastName").Set DataTable("Lastname", dtGlobalSheet)

	If email = True then
		.WebEdit("name:=email").Set DataTable("Email", dtGlobalSheet)
		Else
			a = " must be a well-formed email address"
			msgbox a
	End If

	If phone = True Then
		.WebEdit("name:=phone").Set DataTable("Phone", dtGlobalSheet)
		Else
			b = " phone number must not be blank"
			msgbox b
	End If

	.WebEdit("name:=address1").Set DataTable("Address1", dtGlobalSheet)
	.WebEdit("name:=address2").Set DataTable("Address2", dtGlobalSheet)
	.WebEdit("name:=city").Set DataTable("City", dtGlobalSheet)
	.WebEdit("name:=state").Set DataTable("State", dtGlobalSheet)
	.WebEdit("name:=zip").Set DataTable("Zip", dtGlobalSheet)
	.WebEdit("name:=country").Set DataTable("Countary", dtGlobalSheet)
	.WebList("name:=languagePreference").Select DataTable("LanguagePreference", dtGlobalSheet)
	.WebList("name:=favouriteCategoryId").Select DataTable("FavouriteCategory", dtGlobalSheet)
	.WebCheckBox("name:=listOption").Click
	.WebCheckBox("name:=bannerOption").Click
	.WebButton("name:=Save Account Information").Click
End With

'----------End Transaction-------
Services.EndTransaction "Signup"

'----------ExportSheet---------------
DataTable.ExportSheet "S:\JPetStore\Test Data\SignupModuleExport.xlsx", "Global", "sheet1"

'----------Reporting Event------------
reporter.ReportEvent micDone ,"Script Run Successfully","Save Information and Create the account Successfully"
