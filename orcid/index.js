module.exports = ({ env }) => ({
  admin: {
    // ...
    providers: [
      {
        uid: "orcid",
        displayName: "ORCID",
        icon: "https://orcid.org/sites/default/files/images/orcid_16x16.png",
        createStrategy: "providers/orcid",
      },
    ],
  },
});
