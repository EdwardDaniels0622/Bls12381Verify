pragma solidity 0.8.17;

import "./BLS.sol";
import "./G1.sol";
import "./G2.sol";
import "./Fp.sol";

contract Bls12381 {
    using FP for Fp;
    using G1 for G1Point;
    using G2 for G2Point;

    function bls_fast_aggregate_verify(
        bytes[] calldata uncompressed_pubkeys,
        bytes32 message,
        bytes calldata uncompressed_signature
    )public view returns (bool){

        return BLS.fast_aggregate_verify(uncompressed_pubkeys,message,uncompressed_signature);
    }

    function bls12381Check(G1Point memory pk, G2Point memory h, G2Point memory s)public view returns (bool){

        return BLS.bls_pairing_check(pk,h,s);
    }
}
