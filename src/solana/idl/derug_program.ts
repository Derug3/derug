export type DerugProgram = {
  version: "0.1.0";
  name: "derug_program";
  instructions: [
    {
      name: "initializeDerug";
      accounts: [
        {
          name: "collectionKey";
          isMut: false;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collectionMetadata";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "totalSupply";
          type: "u32";
        },
        {
          name: "slug";
          type: "string";
        }
      ];
    },
    {
      name: "createOrUpdateDerugRequest";
      accounts: [
        {
          name: "derugRequest";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "feeWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "utilityDtos";
          type: {
            vec: {
              defined: "UpdateUtilityDataDto";
            };
          };
        }
      ];
    },
    {
      name: "vote";
      accounts: [
        {
          name: "derugRequest";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "cancelDerugRequest";
      accounts: [
        {
          name: "derugRequest";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "claimVictory";
      accounts: [
        {
          name: "derugRequest";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "feeWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initializeReminting";
      accounts: [
        {
          name: "derugRequest";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newCollection";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "masterEdition";
          isMut: true;
          isSigner: false;
        },
        {
          name: "metadataAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "collectionAuthorityRecord";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "remintNft";
      accounts: [
        {
          name: "derugRequest";
          isMut: false;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newCollection";
          isMut: false;
          isSigner: false;
        },
        {
          name: "oldCollection";
          isMut: false;
          isSigner: false;
        },
        {
          name: "oldMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "oldToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "oldMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "oldEdition";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newEdition";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateVerifyCollection";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "nftMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugRequest";
          isMut: false;
          isSigner: false;
        },
        {
          name: "derugData";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pdaAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "collectionMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collectionMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collectionMasterEdition";
          isMut: true;
          isSigner: false;
        },
        {
          name: "derugger";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collectionAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "derugData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slug";
            type: "string";
          },
          {
            name: "collection";
            type: "publicKey";
          },
          {
            name: "rugUpdateAuthority";
            type: "publicKey";
          },
          {
            name: "collectionMetadata";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "totalSupply";
            type: "u32";
          },
          {
            name: "newCollection";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "thresholdDenominator";
            type: "u8";
          },
          {
            name: "dateAdded";
            type: "i64";
          },
          {
            name: "derugStatus";
            type: {
              defined: "DerugStatus";
            };
          },
          {
            name: "periodEnd";
            type: "i64";
          },
          {
            name: "totalReminted";
            type: "u32";
          },
          {
            name: "winningRequest";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "totalSuggestionCount";
            type: "u8";
          },
          {
            name: "collectionName";
            type: "string";
          },
          {
            name: "collectionSymbol";
            type: "string";
          },
          {
            name: "collectionUri";
            type: "string";
          },
          {
            name: "activeRequests";
            type: {
              vec: {
                defined: "ActiveRequest";
              };
            };
          }
        ];
      };
    },
    {
      name: "derugRequest";
      type: {
        kind: "struct";
        fields: [
          {
            name: "derugData";
            type: "publicKey";
          },
          {
            name: "derugger";
            type: "publicKey";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "voteCount";
            type: "u32";
          },
          {
            name: "requestStatus";
            type: {
              defined: "RequestStatus";
            };
          },
          {
            name: "utilityData";
            type: {
              vec: {
                defined: "UtilityData";
              };
            };
          }
        ];
      };
    },
    {
      name: "voteRecord";
      type: {
        kind: "struct";
        fields: [
          {
            name: "voted";
            type: "bool";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "ActiveRequest";
      type: {
        kind: "struct";
        fields: [
          {
            name: "request";
            type: "publicKey";
          },
          {
            name: "voteCount";
            type: "i32";
          },
          {
            name: "winning";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "UtilityData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "title";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "isActive";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "UpdateUtilityDataDto";
      type: {
        kind: "struct";
        fields: [
          {
            name: "title";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "action";
            type: {
              defined: "Action";
            };
          }
        ];
      };
    },
    {
      name: "DerugStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initialized";
          },
          {
            name: "Voting";
          },
          {
            name: "Succeeded";
          },
          {
            name: "Reminting";
          },
          {
            name: "Completed";
          }
        ];
      };
    },
    {
      name: "RequestStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initialized";
          },
          {
            name: "Voting";
          },
          {
            name: "Succeeded";
          },
          {
            name: "Reminting";
          },
          {
            name: "Completed";
          }
        ];
      };
    },
    {
      name: "Action";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Add";
          },
          {
            name: "Remove";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "RuggerSigner";
      msg: "This wallet rugged the collection";
    },
    {
      code: 6001;
      name: "InvalidVoteRecord";
      msg: "Vote record seeds aren't correct";
    },
    {
      code: 6002;
      name: "InvalidTokenAccountMint";
      msg: "Token account is not correct for the mint";
    },
    {
      code: 6003;
      name: "InvalidMetadata";
      msg: "Metadata is not correct for the mint";
    },
    {
      code: 6004;
      name: "EmptyTokenAccount";
      msg: "Token account doesn't possess the nft";
    },
    {
      code: 6005;
      name: "WrongOwner";
      msg: "Payer doesn't own the token account";
    },
    {
      code: 6006;
      name: "AlereadyVoted";
      msg: "User alredy voted with given nft";
    },
    {
      code: 6007;
      name: "WrongDerugger";
      msg: "Signer isn't the required derugger";
    },
    {
      code: 6008;
      name: "InvalidWinningRequest";
      msg: "Request isn't the winning one";
    },
    {
      code: 6009;
      name: "TimeIsOut";
      msg: "You cannot make requests anymore";
    },
    {
      code: 6010;
      name: "NoWinner";
      msg: "There is no winner yet";
    },
    {
      code: 6011;
      name: "CandyMachineUsed";
      msg: "This is not a new candy machine";
    },
    {
      code: 6012;
      name: "InvalidStatus";
      msg: "Derug isn't in the required state";
    },
    {
      code: 6013;
      name: "WrongCollection";
      msg: "Wrong collection sent ";
    }
  ];
};

export const IDL: DerugProgram = {
  version: "0.1.0",
  name: "derug_program",
  instructions: [
    {
      name: "initializeDerug",
      accounts: [
        {
          name: "collectionKey",
          isMut: false,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMetadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "totalSupply",
          type: "u32",
        },
        {
          name: "slug",
          type: "string",
        },
      ],
    },
    {
      name: "createOrUpdateDerugRequest",
      accounts: [
        {
          name: "derugRequest",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feeWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "utilityDtos",
          type: {
            vec: {
              defined: "UpdateUtilityDataDto",
            },
          },
        },
      ],
    },
    {
      name: "vote",
      accounts: [
        {
          name: "derugRequest",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "cancelDerugRequest",
      accounts: [
        {
          name: "derugRequest",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claimVictory",
      accounts: [
        {
          name: "derugRequest",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feeWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initializeReminting",
      accounts: [
        {
          name: "derugRequest",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newCollection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadataAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collectionAuthorityRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "remintNft",
      accounts: [
        {
          name: "derugRequest",
          isMut: false,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newCollection",
          isMut: false,
          isSigner: false,
        },
        {
          name: "oldCollection",
          isMut: false,
          isSigner: false,
        },
        {
          name: "oldMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "oldToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "oldMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "oldEdition",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newEdition",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateVerifyCollection",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugRequest",
          isMut: false,
          isSigner: false,
        },
        {
          name: "derugData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pdaAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collectionMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMasterEdition",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derugger",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "derugData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slug",
            type: "string",
          },
          {
            name: "collection",
            type: "publicKey",
          },
          {
            name: "rugUpdateAuthority",
            type: "publicKey",
          },
          {
            name: "collectionMetadata",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "totalSupply",
            type: "u32",
          },
          {
            name: "newCollection",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "thresholdDenominator",
            type: "u8",
          },
          {
            name: "dateAdded",
            type: "i64",
          },
          {
            name: "derugStatus",
            type: {
              defined: "DerugStatus",
            },
          },
          {
            name: "periodEnd",
            type: "i64",
          },
          {
            name: "totalReminted",
            type: "u32",
          },
          {
            name: "winningRequest",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "totalSuggestionCount",
            type: "u8",
          },
          {
            name: "collectionName",
            type: "string",
          },
          {
            name: "collectionSymbol",
            type: "string",
          },
          {
            name: "collectionUri",
            type: "string",
          },
          {
            name: "activeRequests",
            type: {
              vec: {
                defined: "ActiveRequest",
              },
            },
          },
        ],
      },
    },
    {
      name: "derugRequest",
      type: {
        kind: "struct",
        fields: [
          {
            name: "derugData",
            type: "publicKey",
          },
          {
            name: "derugger",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "voteCount",
            type: "u32",
          },
          {
            name: "requestStatus",
            type: {
              defined: "RequestStatus",
            },
          },
          {
            name: "utilityData",
            type: {
              vec: {
                defined: "UtilityData",
              },
            },
          },
        ],
      },
    },
    {
      name: "voteRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "voted",
            type: "bool",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "ActiveRequest",
      type: {
        kind: "struct",
        fields: [
          {
            name: "request",
            type: "publicKey",
          },
          {
            name: "voteCount",
            type: "i32",
          },
          {
            name: "winning",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "UtilityData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "isActive",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "UpdateUtilityDataDto",
      type: {
        kind: "struct",
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "action",
            type: {
              defined: "Action",
            },
          },
        ],
      },
    },
    {
      name: "DerugStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initialized",
          },
          {
            name: "Voting",
          },
          {
            name: "Succeeded",
          },
          {
            name: "Reminting",
          },
          {
            name: "Completed",
          },
        ],
      },
    },
    {
      name: "RequestStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initialized",
          },
          {
            name: "Voting",
          },
          {
            name: "Succeeded",
          },
          {
            name: "Reminting",
          },
          {
            name: "Completed",
          },
        ],
      },
    },
    {
      name: "Action",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Add",
          },
          {
            name: "Remove",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "RuggerSigner",
      msg: "This wallet rugged the collection",
    },
    {
      code: 6001,
      name: "InvalidVoteRecord",
      msg: "Vote record seeds aren't correct",
    },
    {
      code: 6002,
      name: "InvalidTokenAccountMint",
      msg: "Token account is not correct for the mint",
    },
    {
      code: 6003,
      name: "InvalidMetadata",
      msg: "Metadata is not correct for the mint",
    },
    {
      code: 6004,
      name: "EmptyTokenAccount",
      msg: "Token account doesn't possess the nft",
    },
    {
      code: 6005,
      name: "WrongOwner",
      msg: "Payer doesn't own the token account",
    },
    {
      code: 6006,
      name: "AlereadyVoted",
      msg: "User alredy voted with given nft",
    },
    {
      code: 6007,
      name: "WrongDerugger",
      msg: "Signer isn't the required derugger",
    },
    {
      code: 6008,
      name: "InvalidWinningRequest",
      msg: "Request isn't the winning one",
    },
    {
      code: 6009,
      name: "TimeIsOut",
      msg: "You cannot make requests anymore",
    },
    {
      code: 6010,
      name: "NoWinner",
      msg: "There is no winner yet",
    },
    {
      code: 6011,
      name: "CandyMachineUsed",
      msg: "This is not a new candy machine",
    },
    {
      code: 6012,
      name: "InvalidStatus",
      msg: "Derug isn't in the required state",
    },
    {
      code: 6013,
      name: "WrongCollection",
      msg: "Wrong collection sent ",
    },
  ],
};
