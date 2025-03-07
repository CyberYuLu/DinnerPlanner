import {dishesConst} from './dishesConst.js';
import { assert, expect, should } from 'chai';

const utilities= await import(`../src/${TEST_PREFIX}utilities.js`);
import { recordArrayCB, checkArrayCB} from "./checkCB";


describe("TW1.1.5 reduce(CB, acc) exercise: menuPrice", function tw1_1_5() {
    this.timeout(200000);  // increase to allow debugging during the test run

    before(function tw1_1_5_before(){
        if(!utilities || !utilities.menuPrice)
            this.skip();
    });
    
    it("should sum up dish prices (export the needed function!)", function tw1_1_5_1(){
        this._runnable.title="should sum up dish prices";
        
        const {menuPrice}= utilities;
        const dishes=[dishesConst[4], dishesConst[6], dishesConst[2], dishesConst[7]];

        assert.equal(menuPrice(dishes),  dishesConst[4].pricePerServing
                            + dishesConst[6].pricePerServing
                            + dishesConst[2].pricePerServing
                            + dishesConst[7].pricePerServing
                           , "sum of all dishes' pricePerServing should be returned");
    });

    it("for empty menu, should return the second reduce() parameter", function tw1_1_5_2(){
        const {menuPrice}= utilities;
        const dishes=[];

        recordArrayCB("reduce");
        expect(menuPrice(dishes),  "reduce requires a second paramater").to.equal(0);
        checkArrayCB("calculating menu price");
    });
});
