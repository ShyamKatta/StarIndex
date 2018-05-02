$(document).ready(function () {
            $("button").click(function () {
                $.ajax({
                    url: "https://blooming-plains-41639.herokuapp.com/MyGitStarAPI", "+$('#rand').val()+"/repos",
                    type: "GET",
                    data: { id: $('#rand').val() },
                    success: function (response) {
                        if (response.status == 404) {
                            alert("sdgdf");
                            $("#index_output").html("No such user found.");
                        }
                        else {
                            console.log("wesdf ",JSON.parse(JSON.stringify(response)));
                            var starIndexObject = JSON.parse(JSON.stringify(response));
                            myFunction(starIndexObject)

                        }
                    },
                    error: function (response) {
					$("#index_output").show();
					$("#index").hide();
					$("#myTable").hide();
                        $("#index_output").html("No such user found.");
                    }
                });
            });
        });

        myFunction();
		
		function loadFun(){
			document.getElementById('index_output').style.display= "none";
			document.getElementById('index').style.display = 'none';
			
		}
        function myFunction(starIndexObject) {
            document.getElementById('index_output').innerHTML = "<h2><strong> Star Index : " + starIndexObject.starIndex + "</strong></h1>";
            var obj = starIndexObject;
            var table = document.getElementById("myTable");
            var row, cell1, cell2;
			var rowCount = table.rows.length;
			document.getElementById('index_output').style.display = 'block';
			document.getElementById('myTable').style.display = 'table';
			document.getElementById('index').style.display = 'block';
			for (var i = rowCount - 1; i > 0; i--) {
				table.deleteRow(i);
			}
            console.log("I write ",obj.starIndexRepos.length," is written here");
            for (var i = 0; i < obj.starIndexRepos.length; i++) {
                row = table.insertRow(1);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = obj.starIndexRepos[i].repo_name;
                cell2.innerHTML = obj.starIndexRepos[i].repo_stars;
            }
        }
