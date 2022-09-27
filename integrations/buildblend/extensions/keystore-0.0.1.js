// Deprecated
buildblend.keyStore = new BuildblendExtension(false, "KeyStore", "0.0.1", "BuildblendAdditional");
buildblend.keyStore.datasets = [];
buildblend.keyStore.globalKeys = [];
buildblend.keyStore.init = function(params) {
  console.log("On it.");
}
buildblend.keyStore.createDataset = function(name, sort) {
  if (buildblend.keyStore.datasets.indexOf(name) == -1) {
    if (sort == "addLast") {
      buildblend.keyStore.datasets.push({name: name, keys: []});
    } else if (sort == "addFirst") {
      buildblend.keyStore.datasets.unshift({name: name, keys: []});
    } else {
      buildblend.keyStore.datasets.push({name: name, keys: []});
      return name;
    }
  } else {
    return {  type: "BuildblendError", name: "ExistentValueProvision", message: "Parameter \"name\" has been provided a value which already exists.", time: new Date()  };
  }
}
buildblend.keyStore.createKey = function(dataset, name, value, position) {
  if (typeof position == 'number') {
    if (buildblend.keyStore.datasets[0].indexOf(dataset.name) != -1) {
      var datasetIndex = buildblend.keyStore.datasets.indexOf(dataset);
      buildblend.keyStore.datasets.splice(datasetIndex, 1, { name: dataset, keys: this.join([{name: name, value: value}]) });
    } else {
      return {  type: "BuildblendExtensionError", name: "InvalidDataset", message: "Provided dataset does not exist.", time: new Date()  };
    }
  }
};