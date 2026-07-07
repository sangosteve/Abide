import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { givingFunds } from "@/constants/mockData";

const tabs = ["Give", "Scheduled", "History"];
const presetAmounts = [10, 25, 50, 100];

export default function GiveScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Give");
  const [selectedFund, setSelectedFund] = useState("tithe");
  const [amount, setAmount] = useState(50);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(50);
  const [showSuccess, setShowSuccess] = useState(false);
  const topPadding = Platform.OS === "web" ? 80 : insets.top + 16;

  const adjustAmount = (delta: number) => {
    const next = Math.max(1, amount + delta);
    setAmount(next);
    setSelectedPreset(presetAmounts.includes(next) ? next : null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const selectPreset = (val: number) => {
    setAmount(val);
    setSelectedPreset(val);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleGive = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowSuccess(true);
  };

  const fundIcons: Record<string, string> = {
    tithe: "heart",
    offering: "gift",
    missions: "globe",
    building: "home",
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: topPadding }]}>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>Give</Text>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.muted }]}>
            <Feather name="bell" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={[styles.tabRow, { backgroundColor: colors.muted, borderColor: colors.border }]}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && { backgroundColor: colors.background },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab ? colors.foreground : colors.mutedForeground,
                    fontFamily: activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "Give" && (
          <>
            {/* Fund Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                  Select Fund
                </Text>
                <View style={[styles.taxBadge, { backgroundColor: "#ECFDF5" }]}>
                  <Text style={[styles.taxBadgeText, { color: "#059669" }]}>Tax Deductible</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fundsRow}>
                {givingFunds.map((fund) => (
                  <TouchableOpacity
                    key={fund.id}
                    style={[
                      styles.fundCard,
                      {
                        borderColor: selectedFund === fund.id ? colors.primary : colors.border,
                        backgroundColor: selectedFund === fund.id ? "#EFF6FF" : colors.card,
                      },
                    ]}
                    onPress={() => {
                      setSelectedFund(fund.id);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    {selectedFund === fund.id && (
                      <View style={[styles.fundCheckmark, { backgroundColor: colors.primary }]}>
                        <Feather name="check" size={10} color="#FFF" />
                      </View>
                    )}
                    <View style={[styles.fundIconBox, { backgroundColor: selectedFund === fund.id ? colors.primary : colors.muted }]}>
                      <Feather
                        name={fundIcons[fund.id] as any}
                        size={22}
                        color={selectedFund === fund.id ? "#FFF" : colors.mutedForeground}
                      />
                    </View>
                    <Text style={[styles.fundName, { color: colors.foreground }]}>{fund.name}</Text>
                    <Text style={[styles.fundDesc, { color: colors.mutedForeground }]}>
                      {fund.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Amount */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Contribution Amount
              </Text>
              <View style={styles.amountDisplay}>
                <Text style={[styles.amountSymbol, { color: colors.primary }]}>$</Text>
                <Text style={[styles.amountValue, { color: colors.foreground }]}>{amount}</Text>
                <TouchableOpacity
                  style={[styles.clearBtn, { backgroundColor: colors.muted }]}
                  onPress={() => {
                    setAmount(0);
                    setSelectedPreset(null);
                  }}
                >
                  <Feather name="x" size={14} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>
              <View style={styles.presetRow}>
                {presetAmounts.map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[
                      styles.presetBtn,
                      {
                        borderColor: selectedPreset === val ? colors.primary : colors.border,
                        backgroundColor: selectedPreset === val ? colors.primary : "transparent",
                      },
                    ]}
                    onPress={() => selectPreset(val)}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        { color: selectedPreset === val ? "#FFF" : colors.foreground },
                      ]}
                    >
                      ${val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.adjustRow}>
                <TouchableOpacity
                  style={[styles.adjustBtn, { borderColor: colors.border }]}
                  onPress={() => adjustAmount(-5)}
                >
                  <Feather name="minus" size={20} color={colors.foreground} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.adjustBtn, { borderColor: colors.border }]}
                  onPress={() => adjustAmount(5)}
                >
                  <Feather name="plus" size={20} color={colors.foreground} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Payment Method
              </Text>
              <TouchableOpacity
                style={[styles.paymentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.cardIcon, { backgroundColor: colors.muted }]}>
                  <Feather name="credit-card" size={20} color={colors.foreground} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, { color: colors.foreground }]}>
                    MasterCard •••• 4242
                  </Text>
                  <Text style={[styles.cardExpiry, { color: colors.mutedForeground }]}>
                    Expires 12/26
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addPaymentBtn}>
                <Feather name="plus" size={16} color={colors.primary} />
                <Text style={[styles.addPaymentText, { color: colors.primary }]}>
                  Add New Payment Method
                </Text>
              </TouchableOpacity>
            </View>

            {/* Secure note */}
            <View style={styles.secureNote}>
              <Feather name="lock" size={14} color={colors.mutedForeground} />
              <Text style={[styles.secureTitle, { color: colors.mutedForeground }]}>
                SECURE ENCRYPTED PROCESSING
              </Text>
            </View>
            <Text style={[styles.secureDesc, { color: colors.mutedForeground }]}>
              Your generosity helps us continue our mission. All donations are secure and encrypted via industry-standard protocols.
            </Text>
          </>
        )}

        {activeTab === "Scheduled" && (
          <View style={styles.emptyState}>
            <Feather name="clock" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No Scheduled Gifts</Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
              Set up recurring giving to automate your generosity.
            </Text>
          </View>
        )}

        {activeTab === "History" && (
          <View style={styles.emptyState}>
            <Feather name="list" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Giving History</Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
              Your donation history will appear here.
            </Text>
          </View>
        )}
      </ScrollView>

      {activeTab === "Give" && (
        <View
          style={[
            styles.giveFooter,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 10,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.giveBtn, { backgroundColor: colors.primary }]}
            onPress={handleGive}
            activeOpacity={0.85}
          >
            <Feather name="shield" size={18} color="#FFF" />
            <Text style={styles.giveBtnText}>Give ${amount} Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.successModal, { backgroundColor: colors.background }]}>
            <View style={[styles.successIcon, { backgroundColor: "#ECFDF5" }]}>
              <Feather name="check-circle" size={40} color="#059669" />
            </View>
            <Text style={[styles.successTitle, { color: colors.foreground }]}>
              Thank You!
            </Text>
            <Text style={[styles.successAmount, { color: colors.primary }]}>
              ${amount} Received
            </Text>
            <Text style={[styles.successMsg, { color: colors.mutedForeground }]}>
              Your generous gift to {givingFunds.find((f) => f.id === selectedFund)?.name} has been received. May God bless you abundantly.
            </Text>
            <TouchableOpacity
              style={[styles.successBtn, { backgroundColor: colors.primary }]}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.successBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  pageTitle: { fontSize: 28, fontFamily: "Inter_700Bold" },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 10 },
  tabText: { fontSize: 14 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontFamily: "Inter_700Bold" },
  taxBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  taxBadgeText: { fontSize: 12, fontFamily: "Inter_500Medium" },
  fundsRow: { marginHorizontal: -20, paddingHorizontal: 20 },
  fundCard: {
    width: 110,
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    marginRight: 10,
    alignItems: "center",
    gap: 6,
    position: "relative",
  },
  fundCheckmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  fundIconBox: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  fundName: { fontSize: 14, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  fundDesc: { fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center" },
  amountDisplay: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 16, paddingTop: 8 },
  amountSymbol: { fontSize: 32, fontFamily: "Inter_600SemiBold" },
  amountValue: { fontSize: 56, fontFamily: "Inter_700Bold", flex: 1 },
  clearBtn: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  presetRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  presetBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, alignItems: "center" },
  presetText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  adjustRow: { flexDirection: "row", gap: 12 },
  adjustBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, alignItems: "center" },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  cardExpiry: { fontSize: 13, fontFamily: "Inter_400Regular" },
  addPaymentBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  addPaymentText: { fontSize: 14, fontFamily: "Inter_500Medium" },
  secureNote: { flexDirection: "row", alignItems: "center", gap: 6, justifyContent: "center", marginBottom: 6 },
  secureTitle: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 },
  secureDesc: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 32,
    lineHeight: 20,
    marginBottom: 16,
  },
  giveFooter: { borderTopWidth: 1, paddingHorizontal: 20, paddingTop: 12 },
  giveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 50,
    paddingVertical: 16,
  },
  giveBtnText: { color: "#FFF", fontSize: 17, fontFamily: "Inter_700Bold" },
  emptyState: { alignItems: "center", paddingTop: 60, paddingHorizontal: 40, gap: 12 },
  emptyTitle: { fontSize: 18, fontFamily: "Inter_600SemiBold" },
  emptyDesc: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  successModal: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    gap: 12,
  },
  successIcon: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  successTitle: { fontSize: 24, fontFamily: "Inter_700Bold" },
  successAmount: { fontSize: 36, fontFamily: "Inter_700Bold" },
  successMsg: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
  successBtn: { width: "100%", paddingVertical: 14, borderRadius: 50, alignItems: "center", marginTop: 8 },
  successBtnText: { color: "#FFF", fontSize: 16, fontFamily: "Inter_700Bold" },
});
