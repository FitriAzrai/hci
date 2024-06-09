"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaHourglassHalf, FaReceipt, FaCheck, FaStar, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const OrderInfoPage = () => {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState(10);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [orderStatus, setOrderStatus] = useState<'received' | 'cooking' | 'completed'>('received');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const orders = [
    {
      id: 1,
      name: '불불불싸이버거 세트',
      price: 9000,
      quantity: 2,
      img: '/불불불싸이버거.jpg',
    },
    {
      id: 2,
      name: '골든맥앤치즈비프버거',
      price: 6000,
      quantity: 1,
      img: '/골든맥앤치즈비프버거.jpg',
    },
  ];

  useEffect(() => {
    if (router.query.paymentMethod) {
      setPaymentMethod(router.query.paymentMethod as string);
    }
  }, [router.query]);

  const handleTableNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableNumber(Number(event.target.value));
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const advanceOrderStatus = () => {
    if (orderStatus === 'received') {
      setOrderStatus('cooking');
    } else if (orderStatus === 'cooking') {
      setOrderStatus('completed');
      openReviewModal();
    }
  };

  const goBackOrderStatus = () => {
    if (orderStatus === 'cooking') {
      setOrderStatus('received');
    } else if (orderStatus === 'completed') {
      setOrderStatus('cooking');
    }
  };

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md max-w-screen-md sm:max-w-screen-lg">
      <div className="flex justify-between items-center mb-4">
        <Link href="/cart">
          <a className="mr-2" title="Back">
            <FaArrowLeft size={24} />
          </a>
        </Link>
        <h1 className="text-2xl font-semibold flex-grow text-center">주문 정보</h1>
        <div className="w-8"></div> {/* Placeholder to balance the layout */}
      </div>

      <div className="border border-black rounded-lg p-4 mb-4">
        <div className="text-gray-500 text-sm mb-2">주문번호 20240524</div>
        <div className="text-gray-700 text-base mb-4">
          주문하신 불불불싸이버거 세트 2개 외 1개의 주문이 접수되었습니다.
        </div>
        <div className="flex justify-between">
          <button
            className={`flex items-center justify-center w-24 h-10 rounded ${
              orderStatus === 'received' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}
            title="Order Received"
            onClick={advanceOrderStatus}
            disabled={orderStatus !== 'received'}
          >
            <FaReceipt className="mr-2" /> 주문 접수
          </button>
          <button
            className={`flex items-center justify-center w-24 h-10 rounded ${
              orderStatus === 'cooking' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}
            title="Cooking"
            onClick={advanceOrderStatus}
            disabled={orderStatus !== 'cooking'}
          >
            <FaHourglassHalf className="mr-2" /> 조리 중
          </button>
          <button
            className={`flex items-center justify-center w-24 h-10 rounded ${
              orderStatus === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}
            title="Cooking Completed"
            disabled={orderStatus !== 'completed'}
          >
            <FaCheck className="mr-2" /> 조리 완료
          </button>
        </div>
      </div>

      <div className="border border-black rounded-lg p-4 mb-4 text-center">
        <label htmlFor="tableNumber" className="text-gray-500 text-sm mb-2 block" title="Table Number">테이블 번호</label>
        <select
          id="tableNumber"
          value={tableNumber}
          onChange={handleTableNumberChange}
          className="text-3xl font-bold text-gray-700 bg-white border border-gray-300 rounded-md p-2"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(number => (
            <option key={number} value={number}>
              {number}번
            </option>
          ))}
        </select>
      </div>

      <div className="border border-black rounded-lg p-4 mb-4 overflow-y-auto max-h-64">
        {orders.map(order => (
          <div key={order.id} className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0">
            <img src={order.img} alt={order.name} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4">
              <div className="text-gray-700 text-base">{order.name}</div>
              <div className="text-gray-500 text-sm">{order.price}원</div>
            </div>
            <div className="text-gray-700 text-base">{order.quantity}개</div>
          </div>
        ))}
      </div>

      <div className="border border-black rounded-lg p-4 mt-4 flex justify-between items-center">
        <div className="text-gray-700 text-lg font-semibold">총 결제금액</div>
        <div className="text-gray-900 text-2xl font-bold">24,000원</div>
      </div>

      <div className="border border-black rounded-lg p-4 mt-4">
        <div className="text-gray-700 text-lg font-semibold mb-2">결제 영수증</div>
        {paymentMethod === 'cash' ? (
          <div>현금 결제로 결제하였습니다.</div>
        ) : (
          <div>카드 결제로 결제하였습니다.</div>
        )}
      </div>

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md max-w-lg w-full">
            <div className="flex items-center mb-4">
              <button onClick={closeReviewModal} className="mr-2" title="Close">
                <FaArrowLeft size={24} />
              </button>
              <h2 className="text-lg font-semibold">리뷰를 작성해주세요.</h2>
            </div>
            <p className="mb-4">맘스터치 에서의 식사는 만족스러우셨나요? 별점과 함께 리뷰를 남겨주세요~</p>
            <textarea
              title="리뷰를 작성해주세요."
              placeholder="리뷰를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
                <FaStar
                  key={star}
                  size={24}
                  className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                  onClick={() => handleRating(star)}
                  title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                />
              ))}
            </div>
            <button
              onClick={closeReviewModal}
              className="bg-yellow-500 text-white rounded p-2 mt-4"
              title="Submit Review"
            >
              리뷰 제출
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderInfoPage;
