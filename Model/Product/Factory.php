<?php

namespace Nosto\Tagging\Model\Product;

use Magento\Framework\ObjectManagerInterface;

class Factory
{
    /**
     * @var ObjectManagerInterface
     */
    protected $_objectManager;

    /**
     * @param ObjectManagerInterface $objectManager
     */
    public function __construct(ObjectManagerInterface $objectManager)
    {
        $this->_objectManager = $objectManager;
    }

    /**
     * Create new product object.
     *
     * @param array $data
     * @return \NostoProduct
     */
    public function create(array $data = [])
    {
        return $this->_objectManager->create('NostoProduct', $data);
    }
}
