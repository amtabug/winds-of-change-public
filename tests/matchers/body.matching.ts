export const validResponseBody = {
  data: {
    id: 55589,
    code: "20260327-055589",
    currency: "USD",
    package_id: "moshi-moshi-7days-1gb",
    quantity: "6", // Changed to string to reflect the actual response from the API and match the schema definition
    type: "sim",
    description: "Test 6 of package moshi-moshi-7days-1gb",
    esim_type: "local",
    validity: 7,
    package: "Moshi Moshi-1 GB - 7 days",
    data: "1 GB",
    price: 4,
    pricing_model: "net_pricing",
    created_at: "2026-03-27 01:39:22",
    manual_installation:
      "<p><b>eSIM name:</b> Moshi Moshi</p><p><b>Coverage: </b>Japan</p><p><b>To manually activate the eSIM on your eSIM capable device:</b></p><ol><li>Settings > Cellular/Mobile > Add Cellular/Mobile Plan.</li><li>Manually enter the SM-DP+ Address and activation code.</li><li>Confirm eSIM plan details.</li><li>Label the eSIM.</li></ol><p><b>To access Data:</b></p><ol><li>Enable data roaming.</li></ol>",
    qrcode_installation:
      "<p><b>eSIM name:</b> Moshi Moshi</p><p><b>Coverage: </b>Japan</p><p><b>To activate the eSIM by scanning the QR code on your eSIM capable device you need to print or display this QR code on another device:</b></p><ol><li>Settings > Cellular/Mobile > Add Cellular/Mobile Plan.</li><li>Scan QR code.</li><li>Confirm eSIM plan details.</li><li>Label the eSIM</li></ol><p><b>To access Data:</b></p><ol><li>Enable data roaming.</li></ol>",
    installation_guides: {
      en: "https://www.airalo.com/help/getting-started-with-airalo",
    },
    text: null,
    voice: null,
    net_price: 2.1,
    brand_settings_name: "string", // Changed to string to reflect the actual response from the API and match the schema definition
    sims: [
      {
        id: 56929,
        created_at: "2026-03-27 01:39:22",
        iccid: "8900000622514555091",
        lpa: "lpa.airalo.com",
        imsis: null,
        matching_id: "DUMMY-2602170200-LiHuT-65257",
        qrcode: "LPA:1$lpa.airalo.com$DUMMY-2602170200-LiHuT-65257",
        qrcode_url:
          "https://sandbox.airalo.com/qr?expires=1860889162&id=399117&signature=9054b4b973e4ec8a5db5fad4fd51633552567667c396f8ebe2acc8c588686e1b",
        airalo_code: null,
        apn_type: "automatic",
        apn_value: null,
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: "automatic",
            apn_value: null,
          },
          android: {
            apn_type: "automatic",
            apn_value: null,
          },
        },
        msisdn: null,
        direct_apple_installation_url:
          "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$lpa.airalo.com$DUMMY-2602170200-LiHuT-65257",
      },
      {
        id: 56930,
        created_at: "2026-03-27 01:39:22",
        iccid: "8900000859623555095",
        lpa: "lpa.airalo.com",
        imsis: null,
        matching_id: "DUMMY-2602170200-ltL5i-30061",
        qrcode: "LPA:1$lpa.airalo.com$DUMMY-2602170200-ltL5i-30061",
        qrcode_url:
          "https://sandbox.airalo.com/qr?expires=1860889162&id=399118&signature=a7db667a4a2fd9ac1f981082bebb209c3f556f65782f787812154c1ff6222a3c",
        airalo_code: null,
        apn_type: "manual",
        apn_value: null, // Changed to null to reflect the actual response from the API and match the schema definition
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
          android: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
        },
        msisdn: null,
        direct_apple_installation_url:
          "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$lpa.airalo.com$DUMMY-2602170200-ltL5i-30061",
      },
      {
        id: 56931,
        created_at: "2026-03-27 01:39:22",
        iccid: "8900000563023555098",
        lpa: "lpa.airalo.com",
        imsis: null,
        matching_id: "DUMMY-2602170200-23qSn-23824",
        qrcode: "LPA:1$lpa.airalo.com$DUMMY-2602170200-23qSn-23824",
        qrcode_url:
          "https://sandbox.airalo.com/qr?expires=1860889162&id=399119&signature=705a4568da530e5d3d355c865ffbfb7a57a747ae524412836ece0de06fcd7ba1",
        airalo_code: null,
        apn_type: "manual",
        apn_value: null, // Changed to null to reflect the actual response from the API and match the schema definition
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
          android: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
        },
        msisdn: null,
        direct_apple_installation_url:
          "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$lpa.airalo.com$DUMMY-2602170200-23qSn-23824",
      },
      {
        id: 56932,
        created_at: "2026-03-27 01:39:22",
        iccid: "8900000198052555102",
        lpa: "lpa.airalo.com",
        imsis: null,
        matching_id: "DUMMY-2602170200-wlWhD-32213",
        qrcode: "LPA:1$lpa.airalo.com$DUMMY-2602170200-wlWhD-32213",
        qrcode_url:
          "https://sandbox.airalo.com/qr?expires=1860889162&id=399120&signature=36c02e85ac53774e95874075916bd95470afee9468975d59e7d0c311e6c5e6bc",
        airalo_code: null,
        apn_type: "manual",
        apn_value: null, // Changed to null to reflect the actual response from the API and match the schema definition
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
          android: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
        },
        msisdn: null,
        direct_apple_installation_url:
          "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$lpa.airalo.com$DUMMY-2602170200-wlWhD-32213",
      },
      {
        id: 56933,
        created_at: "2026-03-27 01:39:22",
        iccid: "8900000130260555106",
        lpa: "lpa.airalo.com",
        imsis: null,
        matching_id: "DUMMY-2602170200-WXDMy-80365",
        qrcode: "LPA:1$lpa.airalo.com$DUMMY-2602170200-WXDMy-80365",
        qrcode_url:
          "https://sandbox.airalo.com/qr?expires=1860889162&id=399121&signature=9f5b5f3100fad9f26706937e63d5bda11847b3e72433e2da5e7dd0d9fb347aac",
        airalo_code: null,
        apn_type: "manual",
        apn_value: null, // Changed to null to reflect the actual response from the API and match the schema definition
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
          android: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
        },
        msisdn: null,
        direct_apple_installation_url:
          "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$lpa.airalo.com$DUMMY-2602170200-WXDMy-80365",
      },
      {
        id: 56934,
        created_at: "2026-03-27 01:39:22",
        iccid: "8900000259553555109",
        lpa: "lpa.airalo.com",
        imsis: null,
        matching_id: "DUMMY-2602170200-72ER2-66359",
        qrcode: "LPA:1$lpa.airalo.com$DUMMY-2602170200-72ER2-66359",
        qrcode_url:
          "https://sandbox.airalo.com/qr?expires=1860889162&id=399122&signature=f677048e8ddcab75739615e0a7ca8481fff446f98561e10bb54ba027d683184c",
        airalo_code: null,
        apn_type: "manual",
        apn_value: null,
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
          android: {
            apn_type: "manual",
            apn_value: "globaldata",
          },
        },
        msisdn: null,
        direct_apple_installation_url:
          "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$lpa.airalo.com$DUMMY-2602170200-72ER2-66359",
      },
    ],
  },
  meta: {
    message: "success",
  },
};
