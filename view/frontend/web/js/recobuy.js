/*
 * Copyright (c) 2017, Nosto Solutions Ltd
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author Nosto Solutions Ltd <contact@nosto.com>
 * @copyright 2017 Nosto Solutions Ltd
 * @license http://opensource.org/licenses/BSD-3-Clause BSD 3-Clause
 *
 */

define(['catalogAddToCart', 'nostojs', 'jquery'], function (addToCart, nostojs, $) {

    //noinspection SpellCheckingInspection
    var form = $('#nosto_addtocart_form');
    var helper = new addToCart();

    Recobuy = {};
    Recobuy.addProductToCart = function (productId, element) {
        var productData = {
            "productId" : productId,
            'skuId' : productId
        };
        Recobuy.addSkuToCart(productData, element);
    };

    //Product object must have fields productId and skuId productId: 123, skuId: 321
    Recobuy.addSkuToCart = function (product, element) {
        if (typeof element === 'object') {
            var slotId = this.resolveContextSlotId(element);
            if (slotId) {
                nostojs(function (api) {
                    api.recommendedProductAddedToCart(product.productId, slotId);
                });
            }
        }

        form.find('input[name="product"]').val(product.skuId);
        form.find('input[name="qty"]').val(1);
        helper.ajaxSubmit(form);
    };
    
    Recobuy.resolveContextSlotId = function (element) {
        var m = 20;
        var n = 0;
        var e = element;
        while (typeof e.parentElement !== "undefined" && e.parentElement) {
            ++n;
            e = e.parentElement;
            if (e.getAttribute('class') === 'nosto_element' && e.getAttribute('id')) {
                return e.getAttribute('id');
            }
            if (n >= m) {
                return false;
            }
        }
        return false;
    };

    return Recobuy;
});