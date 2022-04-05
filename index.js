const { version } = "v1.1.5"
const sector = "AeryumaSactuanary-Devoid10";
const oniichan = ["566214348368773121", "765195570347638784", "552487001824296970", "859942243372499005", "741155604747517963", "925278762206105651"]

class ConstellarExtension {
  constructor() {
    this._events = {};
    this.version = "v1.1.5-discord";
    this.shard = null;
    this.databaseStart = undefined;
    this.systemStart = undefined;
    this.commands = []
  }
  open(client, tokenApi) {
    try {
      const axios = require("axios");

      if (!client) {
        throw 'Client Tidak Ditemukan'
      } else if (!tokenApi) {
        throw 'Token API Tidak Ditemukan'
      }

      //Config
      try {
        this.shard = client.guilds.cache.map(x => x.shardId)[0];
      } catch (err) {
        console.log(`[ERROR] Setup Gagal : ${err}`)
      }

      //Constellar Obj
      this.start = new Date()
      console.log(`[START] Constellar Extension Aeryuma ${this.version}`)

      //Langsung Gasken :v
      console.log(`
[INFO] Open Constellar 
    ====================================
    Constellar Inugaku (Discord)
    ------------------------------------
    • Node : ${process.version}
    • Constellar : ${this.version}
    • Discord.js : ${require('discord.js').version}
    Dev : Kanaka Nakazawa
    ××××××××××××××××××××××××××××××××××××
    Username : ${client.user.username}
    ID : ${client.user.id}
    Shard : ${this.shard}
    //Shard
    Servers : ${client.guilds.cache.size}
    Members : ${client.users.cache.size}
    Channels : ${client.channels.cache.size}
    ====================================
    ©AeryumaDevelopment`)

      this.systemStart = Date.now();

      /*=================
      Uptime
      ===================*/
      var express = require('express')
      var app = express()
      app.get('/', (req, res) => res.sendStatus(200))
      app.listen(process.env.PORT)
      /*=================
      API Get
      ===================*/
      const passcode = tokenApi


      //Ya Gak Tau Sih...
      const snek = require('node-superfetch');
      client.hastebin = async text => {
        const { body } = await snek
          .post('https://bin-clientdev.glitch.me/documents')
          .send(text);
        return `https://bin-clientdev.glitch.me/${body.key}`;
      };

      setTimeout(async function() {
        try {
          const setslash = { name: 'setslash', description: 'Memasang Slash Command' }
          await this.commands.push(setslash)
          await client.application.commands.set(this.commands, '938956133425631292')
        } catch (err) {
          console.log("[ERROR] Setup Slash Cmd :" + err)
        }
      }.bind(this), 1000)


    } catch (err) {
      console.log(`[ERROR] Eror : ${err}`)
      process.exit()
    }
  }

  addCommand(cmd) {
    if (!typeof cmd === Array) throw 'Harus Array'
    this.commands = cmd
  }

  ping() {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }
      var start = Date.now()
      var end = Date.now()
      return (end - start).toString + 'ms'
    } catch (err) {
      `[ERROR] Eror Terdeteksi Kak : ${err}`
    }
  }
  connectDatabase(mongoLink) {
    //Database Dari .env
    const mongoose = require('mongoose')
    if (!mongoLink) {
      console.log('[INFO] Login Tanpa Database')
    } else {
      try {
        this.databaseStart = Date.now()
        mongoose.connect(
          mongoLink, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }
        );
        mongoose.connection.on('open', () => {
          console.log(`[INFO] Database Connected (Mongoose)`);
        });
        mongoose.connection.on('error', err => {
          console.log("[DATABASE] Error :" + err);
        });
      } catch (err) {
        console.log('[INFO] Database Failed to Connect (Mongoose) :\n\n' + err)
      }
    }
  }
}

function get(url) {
  var axios = require('axios')
  return axios.get(url).then(x => x.data)
}

//Module Exports
module.exports = {
  Client: ConstellarExtension,
  version: version,
  sector: sector,
  dev: oniichan,
  get: get
}
