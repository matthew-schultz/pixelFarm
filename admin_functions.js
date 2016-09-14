function createVendor(){
       var file = new CB.CloudFile(documentFile);
       var name = document.getElementById("name").value;
       var type = document.getElementById("type").value;
       var description = document.getElementById("description").value;
       file = document.getElementById("photo").value;
       console.log(name, type, description, photo);
       var vendor = new CB.CloudObject('Vendor');
       vendor.set('name', name);
       vendor.set('type', type);
       vendor.set('description', description);
       vendor.set('picture', file);
       vendor.save({
     success : function(obj){
         console.log(vendor.id); //a new id is automatically generated.
     },error : function(error){
         console.log('object failed to save.');
     }
 });
 }
function uploadPhoto(){
  var photo = document.getElementById('photo').files[0];
  console.log(photo);
    var name = document.getElementById('photo').files[0];
    var cloudFile = new CB.CloudFile(photo);
    cloudFile.set('photo',photo.name);
    cloudFile.save({
      success : function(cloudFile){
        console.log(cloudFile.URL);
      }, error: function(error){
        console.log('error');
      }, uploadProgress : function(percentComplete){
          console.log('upload progress.');
      }
    });
  }
