import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as netbox from './.gen/providers/netbox'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new netbox.NetboxProvider(this, "netbox", {
      serverUrl: "localhost:8000",
      apiToken: "0123456789abcdef0123456789abcdef01234567"
    });

    new netbox.Site(this, "site", {
      name: "site",
    });

    new netbox.DeviceRole(this, "d_role", {
      colorHex: "COFFEE",
      name: "core-sw",
    });

    const man = new netbox.Manufacturer(this, "man", {
      name: "man",
    });

    new netbox.DeviceType(this, "type", {
      model: "blbl",
      manufacturerId: Number(man.id),
    });

    // define resources here
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
