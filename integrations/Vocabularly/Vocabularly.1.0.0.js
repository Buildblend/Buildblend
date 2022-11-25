/*

  Buildblend Vocabularly
  Version 1.0.0

*/

// Inititate Vocabularly.

var Vocabularly = {
  Vocabularly: `Buildblend Vocabularly!`,
  Version: `1.0.0`,
  UncommonWords: {},
  CommonWords: {},
  WordPower: {},
};

// Create aliases for Vocabularly.

var Vocab = Vocabularly;
var Voc = Vocabularly;
var VOC = Vocabularly;

// Create aliases for Vocabularly's modules.

Vocabularly.UW = Vocabularly.UncommonWords;
Vocabularly.CW = Vocabularly.CommonWords;
Vocabularly.WPI = Vocabularly.WordPowerIndex;

// Initiate creation of "UncommonWords" and "CommonWords" objects in the "Vocabulary" object.

Vocabularly.WordPower.Index = [];
Vocabularly.CommonWords.Index = ["Coming Soon"];
Vocabularly.UncommonWords.Index = ["Coming Soon"];

// Add a Uncommon Word Index push function.

Vocabularly.WordPower.Add = function(common, uncommon) {
  if (common != undefined && uncommon == undefined) {
    for (let i = 0; i < common.length; i++) {
      Vocabularly.WordPower.Index.push({
        Priority: common[i].Priority,
        Common: common[i].Common,
        Uncommon: common[i].Uncommon
      });
    }
  } else {
    Vocabularly.WordPower.Index.push({
      Priority: common[i].Priority,
      Common: common,
      Uncommon: uncommon
    });
  }
};

Vocabularly.Replace = function(text, priorityMin, priorityMax) {
  var newText = text;
  var pMin = priorityMin || 0;
  var pMax = priorityMax || 3;
  for (let i = 0; i < Vocabularly.WordPower.Index.length; i++) {
    if (Vocabularly.WordPower.Index[i].Priority < pMin || Vocabularly.WordPower.Index[i].Priority > pMax) {
      console.debug("a");
      continue;
    } else {
      newText = newText.replace(Vocabularly.WordPower.Index[i].Common, Vocabularly.WordPower.Index[i].Uncommon);
      var alphabets = ['A', 'B', 'C', 'D', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var alphabetsLowercase = ['a', 'b', 'c', 'd', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      for (let i = 0; i < alphabetsLowercase.length; i++) {
        newText = newText.replace(`. ${alphabetsLowercase[i]}`, `. ${alphabets[i]}`);
        newText = newText.replace(`! ${alphabetsLowercase[i]}`, `! ${alphabets[i]}`);
        newText = newText.replace(`? ${alphabetsLowercase[i]}`, `? ${alphabets[i]}`);
        newText = newText.replace(`.${alphabetsLowercase[i]}`, `. ${alphabets[i]}`);
        newText = newText.replace(`!${alphabetsLowercase[i]}`, `! ${alphabets[i]}`);
        newText = newText.replace(`?${alphabetsLowercase[i]}`, `? ${alphabets[i]}`);
        newText = newText.replace(/( )a a/g, ` an a`);
        newText = newText.replace(/( )a e/g, ` an e`);
        newText = newText.replace(/( )a i/g, ` an i`);
        newText = newText.replace(/( )a o/g, ` an o`);
        newText = newText.replace(/( )a u/g, ` an u`);
        newText = newText.replace(/( )A a/g, ` An a`);
        newText = newText.replace(/( )A e/g, ` An e`);
        newText = newText.replace(/( )A i/g, ` An i`);
        newText = newText.replace(/( )A o/g, ` An o`);
        newText = newText.replace(/( )A u/g, ` An u`);
      }
    }
  }
  return newText;
};
Vocabularly.R = Vocabularly.Replace;

Vocabularly.WordPower.Add(
  [
    {
      Priority: 1,
      Common: /(because)/gi,
      Uncommon: `for`
    },
    {
      Priority: 3,
      Common: /(tall)/gi,
      Uncommon: `towering`
    },
    {
      Priority: 3,
      Common: /(obtained)/gi,
      Uncommon: `attained`
    },
    {
      Priority: 2,
      Common: /(big|huge)/gi,
      Uncommon: `massive`
    },
    {
      Priority: 1,
      Common: /(awesome|good|amazing)/gi,
      Uncommon: `marvellous`
    },
    {
      Priority: 2,
      Common: /(convert[^ed])/gi,
      Uncommon: `synthesize`
    },
    {
      Priority: 2,
      Common: /(converted])/gi,
      Uncommon: `synthesized`
    },
    {
      Priority: 3,
      Common: /(detailed|elaborated)/gi,
      Uncommon: `meticulous`
    },
    {
      Priority: 2,
      Common: /(luck|chance|opportunity)/gi,
      Uncommon: `fortune`
    },
    {
      Priority: 1,
      Common: /(understand)/gi,
      Uncommon: `comprehend`
    },
    {
      Priority: 2,
      Common: /(useful|beneficial)/gi,
      Uncommon: `advantageous`
    },
    {
      Priority: 3,
      Common: /(strange)/gi,
      Uncommon: `peculiar`
    },
    {
      Priority: 3,
      Common: /(hidden)/gi,
      Uncommon: `concealed`
    },
    {
      Priority: 3,
      Common: /(unasked)/gi,
      Uncommon: `unsolicited`
    },
    {
      Priority: 2,
      Common: /(ugly)/gi,
      Uncommon: `hideous`
    },
    {
      Priority: 1,
      Common: /(uncomfortable)/gi,
      Uncommon: `unpleasant`
    },
    {
      Priority: 1,
      Common: /(tired)/gi,
      Uncommon: `weary`
    },
    {
      Priority: 3,
      Common: /(irregular)/gi,
      Uncommon: `abnormal`
    },
    {
      Priority: 3,
      Common: /(oppose[^d])/gi,
      Uncommon: `contradict`
    },
    {
      Priority: 3,
      Common: /(opposed)/gi,
      Uncommon: `contradicted`
    },
    {
      Priority: 3,
      Common: /(not working)/gi,
      Uncommon: `malfunctioning`
    },
    {
      Priority: 2,
      Common: /(thankful)/gi,
      Uncommon: `grateful`
    },
    {
      Priority: 3,
      Common: /(start|begin)/gi,
      Uncommon: `commence`
    },
    {
      Priority: 3,
      Common: /(appreciate[^d])/gi,
      Uncommon: `commend`
    },
    {
      Priority: 3,
      Common: /(appreciated)/gi,
      Uncommon: `commended`
    },
    {
      Priority: 3,
      Common: /(said above|told above|mentioned above|shown above|showed above|displayed above)/gi,
      Uncommon: `aforementioned`
    },
    {
      Priority: 3,
      Common: /(deep voice|deep sound|deep audio)/gi,
      Uncommon: `sonorous sound`
    },
    {
      Priority: 1,
      Common: /(like to)/gi,
      Uncommon: `prefer to`
    },
    {
      Priority: 1,
      Common: /(easy)/gi,
      Uncommon: `effortless`
    },
    {
      Priority: 1,
      Common: /(trying)/gi,
      Uncommon: `attempting`
    }
  ]
);