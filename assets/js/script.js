
var jobsDiv = $("#jobs");
var SavedAddress;
var currentPage;
var currentJob;
var fulljobsDiv = $("#fullJobs");

$("#search").on("click",function(){
    console.log("hi");
    event.preventDefault();
    currentPage = 1;
    currentJob = $("#jobTitle").val().trim();
    getJobs(currentJob,currentPage,displayJobs);
});

$("#save").on("click",function(){
    event.preventDefault();
    localStorage.setItem("SavedAddress",JSON.stringify($("#addressInput").val().trim()));
});

function init(){
    SavedAddress = localStorage.getItem("SavedAddress") != null?JSON.parse(localStorage.getItem("SavedAddress")): null;
    if(SavedAddress != null){
        $("#addressInput").val(SavedAddress);
    }
}

init();

console.log($("#search"));

function displayJobs(jobsObj){
    jobsDiv.empty();
    let jobsArr = jobsObj.results;
    
    let totalResults = jobsObj.totalResults;
    if (totalResults == 0){
        jobsDiv.append($("h5").text("Sorry, no results found, please use another search term"));
        return;
    }
    let pages = jobsObj.pages;
    
    
    for (var i = 0; i < jobsArr.length;i++){
        
        
        var cardDiv = $("<div>"); //creating the whole body of the card
        cardDiv.addClass("card");
        cardDiv.attr("data-job",JSON.stringify(jobsArr[i]));
        cardDiv.on('click', function(){createFullJobPost(JSON.parse($(this).attr("data-job")))});

        var cardBody = $("<div>"); //bootstrap for card
        cardBody.addClass("card-body");

        var cardTitle = $("<h5>"); //Title of the card
        cardTitle.addClass("card-title");
        cardTitle.html(jobsArr[i].JobTitle);

        var cardCompanyName = $("<h6>"); //Company Name
        cardCompanyName.addClass("card-subtitle mb-2 text-muted");
        cardCompanyName.html(jobsArr[i].JobMapInfo.CompanyName);

        var cardLocation = $("<h6>"); //Location
        cardLocation.addClass("card-subtitle mb-2 text-muted");
        cardLocation.html(jobsArr[i].JobMapInfo.City);

        var cardSalary = $("<h6>"); // Salary
        cardSalary.addClass("card-subtitle mb-2");
        cardSalary.html(jobsArr[i].StrSalary);

        var cardDescription = $("<p>");
        cardDescription.addClass("description");
        cardDescription.html(jobsArr[i].JobDescriptionShort);

        // var cardBtn = $("<button>").addClass("btn btn-primary btn-sm"); //applying the button with the URL LINK
        // var jobUrlLink = $("<a>").attr("href",jobsArr[i].JobUrl).text("Job Link");
        // cardBtn.append(jobUrlLink);
        
        cardDiv.append(cardBody.append(
             cardTitle,cardTitle,cardCompanyName,cardLocation,cardSalary,cardDescription
        ))
        
        jobsDiv.append(cardDiv);
    }
    //TODO: deal with large numbers of pages
    if (pages > 1){
        let pageNav = $("<nav>").css("text-align","center");
        let ul = $("<ul>").addClass("pagination");
        ul.append($("<li>").addClass("page-item")
            .append($("<div>").addClass("page-link").text("Previous").on('click',function(){
            
            if(currentPage == 1){
                return;
            }
            currentPage--;

            getJobs(currentJob,currentPage,displayJobs);
        })));
        for (let i = 1; i <= pages; i++){
            ul.append($("<li>").addClass("page-item")
                .append($("<div>").addClass("page-link").text(i).on('click',function(){
                currentPage = i;
                getJobs(currentJob,currentPage,displayJobs);
            })));
        }
        ul.append($("<li>").addClass("page-item")
            .append($("<div>").addClass("page-link").text("Next").on('click',function(){
            
            if(currentPage == pages){
                return;
            }
            currentPage++;

            getJobs(currentJob,currentPage,displayJobs);
        })));
        
        jobsDiv.append(pageNav.append(ul));
        jobsDiv.prepend(pageNav.append(ul));
    }
    jobsDiv.prepend($("<h5>").attr("id","resultsCount").css("text-align","center").text(totalResults+" jobs found. (Page "+currentPage+" of " +pages+")" ));
}

function createFullJobPost(data){

    var jobDes= $("<div>"); //job desctiion
    jobDes.addClass("jobsDes");
    jobDes.attr("data-job", JSON.stringify(data[i]));

    var jobFullBody = $("<div>"); //body of the job description
    jobFullBody.addClass("job-body");

    var jobFullTitle = $("<h5>"); //basic job title
    jobFullTitle.addClass("job-title");
    jobFullTitle.text(data[i].JobTitle);

    var jobFullLocation = $("<p>"); //basic location of the job
    jobFullLocation.addClass("job-subtitle");
    jobFullLocation.text(data[i].JobMapInfo.City);

    var jobFullCompanyName = $("<p>");//basic company name
    jobFullCompanyName.addClass("job-subtitle");
    jobFullCompanyName.text(data[i].JobMapInfo.CompanyName);

    var jobFullDescription = $("<p>");//full job description
    jobFullDescription.addClass("jobDescription");
    jobFullDescription.text(data[i].JobDescription);

    var cardBtn = $("<button>") //applying the button with the URL LINK
    var jobUrlLink = $("<a>").attr("href",jobsArr[i].JobUrl);
    cardBtn.append(jobUrlLink);

    var mapArea = $("<div>"); //creating a sibling DIV to populate the map under the jobDescription
    mapArea.addClass("mapContainer"); //finish code to API call


    var map = $("<div>"); //generating a map based on the API call
    map.addClass("mapImg"); //finish code to API call 


    var directionsPanel = $("<div>"); //generating directions based on the API call
    directionsPanel.addClass("mapDirections");
    

    jobDes.append(jobFullBody.append(
        jobFullTitle, jobFullLocation, jobFullCompanyName, jobFullDescription, mapArea, map, directionsPanel
    ))
    
    fullJobsDiv.append(jobDes);
    
}
