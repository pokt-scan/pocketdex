// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: poktroll/tokenomics/event.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import {
  Claim,
  ProofRequirementReason,
  proofRequirementReasonFromJSON,
  proofRequirementReasonToJSON,
} from "../proof/types";

export const protobufPackage = "poktroll.tokenomics";

export enum ClaimExpirationReason {
  /** EXPIRATION_REASON_UNSPECIFIED - Default value, means may be valid */
  EXPIRATION_REASON_UNSPECIFIED = 0,
  PROOF_MISSING = 1,
  PROOF_INVALID = 2,
  UNRECOGNIZED = -1,
}

export function claimExpirationReasonFromJSON(object: any): ClaimExpirationReason {
  switch (object) {
    case 0:
    case "EXPIRATION_REASON_UNSPECIFIED":
      return ClaimExpirationReason.EXPIRATION_REASON_UNSPECIFIED;
    case 1:
    case "PROOF_MISSING":
      return ClaimExpirationReason.PROOF_MISSING;
    case 2:
    case "PROOF_INVALID":
      return ClaimExpirationReason.PROOF_INVALID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClaimExpirationReason.UNRECOGNIZED;
  }
}

export function claimExpirationReasonToJSON(object: ClaimExpirationReason): string {
  switch (object) {
    case ClaimExpirationReason.EXPIRATION_REASON_UNSPECIFIED:
      return "EXPIRATION_REASON_UNSPECIFIED";
    case ClaimExpirationReason.PROOF_MISSING:
      return "PROOF_MISSING";
    case ClaimExpirationReason.PROOF_INVALID:
      return "PROOF_INVALID";
    case ClaimExpirationReason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * EventClaimExpired is an event emitted during settlement whenever a claim requiring
 * an on-chain proof doesn't have one. The claim cannot be settled, leading to that work
 * never being rewarded.
 */
export interface EventClaimExpired {
  claim:
    | Claim
    | undefined;
  /** The reason why the claim expired, leading to a Supplier being penalized (i.e. burn). */
  expirationReason: ClaimExpirationReason;
  /** Number of relays claimed to be in the session tree. */
  numRelays: number;
  /**
   * Number of compute units claimed as a function of the number of relays
   * and the compute units per relay for the particular service.
   */
  numClaimedComputeUnits: number;
  /**
   * Number of estimated compute units claimed as a function of the number of claimed
   * compute units and the relay difficulty multiplier for the particular service.
   */
  numEstimatedComputeUnits: number;
  /**
   * The uPOKT coin claimed to be rewarded for the work done as a function of
   * the number of estimated compute units and the compute uints to token multiplier.
   */
  claimedUpokt: Coin | undefined;
}

/**
 * EventClaimSettled is an event emitted whenever a claim is settled.
 * The proof_required determines whether the claim requires a proof that has been submitted or not
 */
export interface EventClaimSettled {
  claim:
    | Claim
    | undefined;
  /** The reason why the claim was settled, leading to a Supplier being rewarded (i.e. mint). */
  proofRequirement: ProofRequirementReason;
  /** Number of relays claimed to be in the session tree. */
  numRelays: number;
  /**
   * Number of compute units claimed as a function of the number of relays
   * and the compute units per relay for the particular service.
   */
  numClaimedComputeUnits: number;
  /**
   * Number of estimated compute units claimed as a function of the number of claimed
   * compute units and the relay difficulty multiplier for the particular service.
   */
  numEstimatedComputeUnits: number;
  /**
   * The uPOKT coin claimed to be rewarded for the work done as a function of
   * the number of estimated compute units and the compute uints to token multiplier.
   */
  claimedUpokt: Coin | undefined;
}

/**
 * EventApplicationOverserviced is emitted when an application has less stake than
 * what a supplier is claiming (i.e. amount available for burning is insufficient).
 * This means the following will ALWAYS be strictly true: effective_burn < expected_burn.
 */
export interface EventApplicationOverserviced {
  applicationAddr: string;
  supplierOperatorAddr: string;
  /**
   * Expected burn is the amount the supplier is claiming for work done
   * to service the application during the session.
   * This is usually the amount in the Claim submitted.
   */
  expectedBurn:
    | Coin
    | undefined;
  /**
   * Effective burn is the amount that is actually being paid to the supplier
   * for the work done. It is less than the expected burn (claim amount) and
   * is a function of the relay mining algorithm.
   * E.g. The application's stake divided by the number of suppliers in a session.
   */
  effectiveBurn: Coin | undefined;
}

/**
 * EventSupplierSlashed is emitted when a supplier is slashed for not providing,
 * or provided invalid required proofs for claims.
 */
export interface EventSupplierSlashed {
  supplierOperatorAddr: string;
  /** Number of expired claims (due to missing or invalid proof) that led to slashing. */
  numExpiredClaims: number;
  /**
   * Amount slashed from the supplier's stake due to the expired claims.
   * This is a function of the number of expired claims and proof missing penalty.
   */
  slashingAmount: Coin | undefined;
}

function createBaseEventClaimExpired(): EventClaimExpired {
  return {
    claim: undefined,
    expirationReason: 0,
    numRelays: 0,
    numClaimedComputeUnits: 0,
    numEstimatedComputeUnits: 0,
    claimedUpokt: undefined,
  };
}

export const EventClaimExpired: MessageFns<EventClaimExpired> = {
  encode(message: EventClaimExpired, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.claim !== undefined) {
      Claim.encode(message.claim, writer.uint32(10).fork()).join();
    }
    if (message.expirationReason !== 0) {
      writer.uint32(16).int32(message.expirationReason);
    }
    if (message.numRelays !== 0) {
      writer.uint32(24).uint64(message.numRelays);
    }
    if (message.numClaimedComputeUnits !== 0) {
      writer.uint32(32).uint64(message.numClaimedComputeUnits);
    }
    if (message.numEstimatedComputeUnits !== 0) {
      writer.uint32(40).uint64(message.numEstimatedComputeUnits);
    }
    if (message.claimedUpokt !== undefined) {
      Coin.encode(message.claimedUpokt, writer.uint32(50).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventClaimExpired {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventClaimExpired();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.claim = Claim.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expirationReason = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numRelays = longToNumber(reader.uint64());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numClaimedComputeUnits = longToNumber(reader.uint64());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.numEstimatedComputeUnits = longToNumber(reader.uint64());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.claimedUpokt = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventClaimExpired {
    return {
      claim: isSet(object.claim) ? Claim.fromJSON(object.claim) : undefined,
      expirationReason: isSet(object.expirationReason) ? claimExpirationReasonFromJSON(object.expirationReason) : 0,
      numRelays: isSet(object.numRelays) ? globalThis.Number(object.numRelays) : 0,
      numClaimedComputeUnits: isSet(object.numClaimedComputeUnits)
        ? globalThis.Number(object.numClaimedComputeUnits)
        : 0,
      numEstimatedComputeUnits: isSet(object.numEstimatedComputeUnits)
        ? globalThis.Number(object.numEstimatedComputeUnits)
        : 0,
      claimedUpokt: isSet(object.claimedUpokt) ? Coin.fromJSON(object.claimedUpokt) : undefined,
    };
  },

  toJSON(message: EventClaimExpired): unknown {
    const obj: any = {};
    if (message.claim !== undefined) {
      obj.claim = Claim.toJSON(message.claim);
    }
    if (message.expirationReason !== 0) {
      obj.expirationReason = claimExpirationReasonToJSON(message.expirationReason);
    }
    if (message.numRelays !== 0) {
      obj.numRelays = Math.round(message.numRelays);
    }
    if (message.numClaimedComputeUnits !== 0) {
      obj.numClaimedComputeUnits = Math.round(message.numClaimedComputeUnits);
    }
    if (message.numEstimatedComputeUnits !== 0) {
      obj.numEstimatedComputeUnits = Math.round(message.numEstimatedComputeUnits);
    }
    if (message.claimedUpokt !== undefined) {
      obj.claimedUpokt = Coin.toJSON(message.claimedUpokt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventClaimExpired>, I>>(base?: I): EventClaimExpired {
    return EventClaimExpired.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventClaimExpired>, I>>(object: I): EventClaimExpired {
    const message = createBaseEventClaimExpired();
    message.claim = (object.claim !== undefined && object.claim !== null) ? Claim.fromPartial(object.claim) : undefined;
    message.expirationReason = object.expirationReason ?? 0;
    message.numRelays = object.numRelays ?? 0;
    message.numClaimedComputeUnits = object.numClaimedComputeUnits ?? 0;
    message.numEstimatedComputeUnits = object.numEstimatedComputeUnits ?? 0;
    message.claimedUpokt = (object.claimedUpokt !== undefined && object.claimedUpokt !== null)
      ? Coin.fromPartial(object.claimedUpokt)
      : undefined;
    return message;
  },
};

function createBaseEventClaimSettled(): EventClaimSettled {
  return {
    claim: undefined,
    proofRequirement: 0,
    numRelays: 0,
    numClaimedComputeUnits: 0,
    numEstimatedComputeUnits: 0,
    claimedUpokt: undefined,
  };
}

export const EventClaimSettled: MessageFns<EventClaimSettled> = {
  encode(message: EventClaimSettled, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.claim !== undefined) {
      Claim.encode(message.claim, writer.uint32(10).fork()).join();
    }
    if (message.proofRequirement !== 0) {
      writer.uint32(16).int32(message.proofRequirement);
    }
    if (message.numRelays !== 0) {
      writer.uint32(24).uint64(message.numRelays);
    }
    if (message.numClaimedComputeUnits !== 0) {
      writer.uint32(32).uint64(message.numClaimedComputeUnits);
    }
    if (message.numEstimatedComputeUnits !== 0) {
      writer.uint32(40).uint64(message.numEstimatedComputeUnits);
    }
    if (message.claimedUpokt !== undefined) {
      Coin.encode(message.claimedUpokt, writer.uint32(50).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventClaimSettled {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventClaimSettled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.claim = Claim.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.proofRequirement = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numRelays = longToNumber(reader.uint64());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numClaimedComputeUnits = longToNumber(reader.uint64());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.numEstimatedComputeUnits = longToNumber(reader.uint64());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.claimedUpokt = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventClaimSettled {
    return {
      claim: isSet(object.claim) ? Claim.fromJSON(object.claim) : undefined,
      proofRequirement: isSet(object.proofRequirement) ? proofRequirementReasonFromJSON(object.proofRequirement) : 0,
      numRelays: isSet(object.numRelays) ? globalThis.Number(object.numRelays) : 0,
      numClaimedComputeUnits: isSet(object.numClaimedComputeUnits)
        ? globalThis.Number(object.numClaimedComputeUnits)
        : 0,
      numEstimatedComputeUnits: isSet(object.numEstimatedComputeUnits)
        ? globalThis.Number(object.numEstimatedComputeUnits)
        : 0,
      claimedUpokt: isSet(object.claimedUpokt) ? Coin.fromJSON(object.claimedUpokt) : undefined,
    };
  },

  toJSON(message: EventClaimSettled): unknown {
    const obj: any = {};
    if (message.claim !== undefined) {
      obj.claim = Claim.toJSON(message.claim);
    }
    if (message.proofRequirement !== 0) {
      obj.proofRequirement = proofRequirementReasonToJSON(message.proofRequirement);
    }
    if (message.numRelays !== 0) {
      obj.numRelays = Math.round(message.numRelays);
    }
    if (message.numClaimedComputeUnits !== 0) {
      obj.numClaimedComputeUnits = Math.round(message.numClaimedComputeUnits);
    }
    if (message.numEstimatedComputeUnits !== 0) {
      obj.numEstimatedComputeUnits = Math.round(message.numEstimatedComputeUnits);
    }
    if (message.claimedUpokt !== undefined) {
      obj.claimedUpokt = Coin.toJSON(message.claimedUpokt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventClaimSettled>, I>>(base?: I): EventClaimSettled {
    return EventClaimSettled.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventClaimSettled>, I>>(object: I): EventClaimSettled {
    const message = createBaseEventClaimSettled();
    message.claim = (object.claim !== undefined && object.claim !== null) ? Claim.fromPartial(object.claim) : undefined;
    message.proofRequirement = object.proofRequirement ?? 0;
    message.numRelays = object.numRelays ?? 0;
    message.numClaimedComputeUnits = object.numClaimedComputeUnits ?? 0;
    message.numEstimatedComputeUnits = object.numEstimatedComputeUnits ?? 0;
    message.claimedUpokt = (object.claimedUpokt !== undefined && object.claimedUpokt !== null)
      ? Coin.fromPartial(object.claimedUpokt)
      : undefined;
    return message;
  },
};

function createBaseEventApplicationOverserviced(): EventApplicationOverserviced {
  return { applicationAddr: "", supplierOperatorAddr: "", expectedBurn: undefined, effectiveBurn: undefined };
}

export const EventApplicationOverserviced: MessageFns<EventApplicationOverserviced> = {
  encode(message: EventApplicationOverserviced, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.applicationAddr !== "") {
      writer.uint32(10).string(message.applicationAddr);
    }
    if (message.supplierOperatorAddr !== "") {
      writer.uint32(18).string(message.supplierOperatorAddr);
    }
    if (message.expectedBurn !== undefined) {
      Coin.encode(message.expectedBurn, writer.uint32(26).fork()).join();
    }
    if (message.effectiveBurn !== undefined) {
      Coin.encode(message.effectiveBurn, writer.uint32(34).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventApplicationOverserviced {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventApplicationOverserviced();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.applicationAddr = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.supplierOperatorAddr = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.expectedBurn = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.effectiveBurn = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventApplicationOverserviced {
    return {
      applicationAddr: isSet(object.applicationAddr) ? globalThis.String(object.applicationAddr) : "",
      supplierOperatorAddr: isSet(object.supplierOperatorAddr) ? globalThis.String(object.supplierOperatorAddr) : "",
      expectedBurn: isSet(object.expectedBurn) ? Coin.fromJSON(object.expectedBurn) : undefined,
      effectiveBurn: isSet(object.effectiveBurn) ? Coin.fromJSON(object.effectiveBurn) : undefined,
    };
  },

  toJSON(message: EventApplicationOverserviced): unknown {
    const obj: any = {};
    if (message.applicationAddr !== "") {
      obj.applicationAddr = message.applicationAddr;
    }
    if (message.supplierOperatorAddr !== "") {
      obj.supplierOperatorAddr = message.supplierOperatorAddr;
    }
    if (message.expectedBurn !== undefined) {
      obj.expectedBurn = Coin.toJSON(message.expectedBurn);
    }
    if (message.effectiveBurn !== undefined) {
      obj.effectiveBurn = Coin.toJSON(message.effectiveBurn);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventApplicationOverserviced>, I>>(base?: I): EventApplicationOverserviced {
    return EventApplicationOverserviced.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventApplicationOverserviced>, I>>(object: I): EventApplicationOverserviced {
    const message = createBaseEventApplicationOverserviced();
    message.applicationAddr = object.applicationAddr ?? "";
    message.supplierOperatorAddr = object.supplierOperatorAddr ?? "";
    message.expectedBurn = (object.expectedBurn !== undefined && object.expectedBurn !== null)
      ? Coin.fromPartial(object.expectedBurn)
      : undefined;
    message.effectiveBurn = (object.effectiveBurn !== undefined && object.effectiveBurn !== null)
      ? Coin.fromPartial(object.effectiveBurn)
      : undefined;
    return message;
  },
};

function createBaseEventSupplierSlashed(): EventSupplierSlashed {
  return { supplierOperatorAddr: "", numExpiredClaims: 0, slashingAmount: undefined };
}

export const EventSupplierSlashed: MessageFns<EventSupplierSlashed> = {
  encode(message: EventSupplierSlashed, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.supplierOperatorAddr !== "") {
      writer.uint32(10).string(message.supplierOperatorAddr);
    }
    if (message.numExpiredClaims !== 0) {
      writer.uint32(16).uint64(message.numExpiredClaims);
    }
    if (message.slashingAmount !== undefined) {
      Coin.encode(message.slashingAmount, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventSupplierSlashed {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSupplierSlashed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.supplierOperatorAddr = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numExpiredClaims = longToNumber(reader.uint64());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slashingAmount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventSupplierSlashed {
    return {
      supplierOperatorAddr: isSet(object.supplierOperatorAddr) ? globalThis.String(object.supplierOperatorAddr) : "",
      numExpiredClaims: isSet(object.numExpiredClaims) ? globalThis.Number(object.numExpiredClaims) : 0,
      slashingAmount: isSet(object.slashingAmount) ? Coin.fromJSON(object.slashingAmount) : undefined,
    };
  },

  toJSON(message: EventSupplierSlashed): unknown {
    const obj: any = {};
    if (message.supplierOperatorAddr !== "") {
      obj.supplierOperatorAddr = message.supplierOperatorAddr;
    }
    if (message.numExpiredClaims !== 0) {
      obj.numExpiredClaims = Math.round(message.numExpiredClaims);
    }
    if (message.slashingAmount !== undefined) {
      obj.slashingAmount = Coin.toJSON(message.slashingAmount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventSupplierSlashed>, I>>(base?: I): EventSupplierSlashed {
    return EventSupplierSlashed.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventSupplierSlashed>, I>>(object: I): EventSupplierSlashed {
    const message = createBaseEventSupplierSlashed();
    message.supplierOperatorAddr = object.supplierOperatorAddr ?? "";
    message.numExpiredClaims = object.numExpiredClaims ?? 0;
    message.slashingAmount = (object.slashingAmount !== undefined && object.slashingAmount !== null)
      ? Coin.fromPartial(object.slashingAmount)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}