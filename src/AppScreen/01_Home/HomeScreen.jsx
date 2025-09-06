import React from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import HomeQuickActions from './HomeQuickActions';
import HomeRecentList from './HomeRecentList';
import HomeTips from './HomeTips';
import LifeStageSelector from '@/AppScreen/03_GameLife/LifeStageSelector';
import EventDisplay from '@/AppScreen/03_GameLife/EventDisplay';
import ProgressTracker from '@/AppScreen/03_GameLife/ProgressTracker';

// Firebase imports for testing
import { db } from '../../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const HomeScreen = () => {
  // Function to test writing to Firestore
  const handleTestWrite = async () => {
    try {
      const docRef = await addDoc(collection(db, "test_collection"), {
        name: "test_data",
        description: "This is a test document from the app.",
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      alert(`Firestoreにテストデータを書き込みました！\nCollection: test_collection\nDocument ID: ${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Firestoreへの書き込みに失敗しました。コンソールログを確認してください。");
    }
  };

  return (
    <div className="home-screen">
      <HomeHeader title="ホーム" subtitle="最近の編集とショートカット" />

      {/* Firebase Test Button */}
      <div className="p-4 m-4 border border-dashed rounded-lg border-sky-400 bg-slate-800">
        <h3 className="mb-2 text-lg font-semibold text-white">Firebase接続テスト</h3>
        <p className="mb-4 text-sm text-gray-300">下のボタンを押すと、Firestoreの 'test_collection' にテストドキュメントが作成されます。</p>
        <button
          onClick={handleTestWrite}
          className="px-4 py-2 font-bold text-white transition-colors bg-sky-500 rounded hover:bg-sky-700"
        >
          Firestore書き込みテストを実行
        </button>
      </div>

      {/* TrialRogue Preview entry from Home */}
      <div className="p-4 m-4 border border-dashed rounded-lg border-emerald-400 bg-slate-800">
        <h3 className="mb-2 text-lg font-semibold text-white">TrialRogue（偏移用ボタン）</h3>
        
        <Link
          to="/trialrogue/title"
          className="inline-block px-4 py-2 font-bold text-white transition-colors bg-emerald-600 rounded hover:bg-emerald-700"
        >
          TrialRogue: Map Preview を開く
        </Link>
      </div>

      <HomeQuickActions />
      <HomeRecentList />
      <HomeTips />
      
      {/* GameLife content integrated into Home screen */}
      <div className="game-life-section">
        <h2>人生シミュレーション</h2>
        <LifeStageSelector />
        <EventDisplay />
        <ProgressTracker />
      </div>
    </div>
  );
};

export default HomeScreen;
