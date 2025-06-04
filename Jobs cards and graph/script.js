
let data, info, output, result;

async function init(){

  let link = "https://data.cityofnewyork.us/resource/ic3t-wcy2.json?$limit=50";
  info = await fetch(link);
  data = await info.json();

  output = document.getElementById("output");
  result = document.getElementById("result");

  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i++){
    let job = data[i];
    build += `<div class="fitted card">`;
    build += `     <h4>${job.job_type || "N/A"}</h4>`;
    build += `     <p>Borough: ${job.borough || "N/A"}</p>`;
    build += `     <p>Status: ${job.job_status_descrp || "N/A"}</p>`;
    build += `     <p>Estimated Cost: $${job.initial_cost || "N/A"}</p>`;
    build += `     <p>Address: ${job.house_no || ""} ${job.street_name || ""}</p>`;
    build += `</div>`;
    ct++;
  }

  result.innerHTML = `${ct} Results found.`;
  output.innerHTML = build;

  document.getElementById("boroughs").innerHTML = fillDropDown("borough");
  document.getElementById("types").innerHTML = fillDropDown("job_type");
  document.getElementById("statuses").innerHTML = fillDropDown("job_status_descrp");
}

function filterJobs(){
  let borough = document.getElementById("boroughs").value;
  let jobType = document.getElementById("types").value;
  let status = document.getElementById("statuses").value;

  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i++){
    let job = data[i];
    if((borough === "" || job.borough === borough) &&
       (jobType === "" || job.job_type === jobType) &&
       (status === "" || job.job_status_descrp === status)){

      build += `<div class="fitted card">`;
      build += `     <h4>${job.job_type || "N/A"}</h4>`;
      build += `     <p>Borough: ${job.borough || "N/A"}</p>`;
      build += `     <p>Status: ${job.job_status_descrp || "N/A"}</p>`;
      build += `     <p>Estimated Cost: $${job.initial_cost || "N/A"}</p>`;
      build += `     <p>Address: ${job.house_no || ""} ${job.street_name || ""}</p>`;
      build += `</div>`;
      ct++;
    }
  }

  result.innerHTML = `${ct} Results found.`;
  output.innerHTML = build;
}

function fillDropDown(key){
  let list = [];
  let build = "<option value=''>All</option>";
  for(let i = 0; i < data.length; i++){
    let val = data[i][key];
    if(val && !list.includes(val)){
      list.push(val);
    }
  }
  list.sort();
  for(let i of list){
    build += `<option value="${i}">${i}</option>`;
  }
  return build;
}
