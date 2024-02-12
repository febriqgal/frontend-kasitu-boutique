"use client";
import { formatRupiah } from "@/app/_constants/AppConfig";
import { Order } from "@/app/_types/order";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";

export default function ReportMonth({
  data,
  month,
}: {
  data: Order[];
  month: string;
}) {
  const styles = StyleSheet.create({
    table: {
      display: "flex",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      textAlign: "left",
      margin: 5,
      fontSize: 10,
    },
  });
  return (
    <Document>
      <Page
        orientation="portrait"
        size="A4"
        style={{ marginVertical: 32, marginLeft: 32, paddingRight: 64 }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            Kasitu Boutique
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            Laporan Penjualan pada {month}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View
              style={{
                width: 20,
                textAlign: "center",
                paddingTop: 5,
                borderRight: 1,
                marginBottom: 1,
                borderBottom: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>No.</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Produk</Text>
            </View>
            <View
              style={{
                width: "5%",
                borderStyle: "solid",
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0,
              }}
            >
              <Text style={styles.tableCell}>qty</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Alamat</Text>
            </View>{" "}
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tanggal</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {data?.map((e: Order, i: any) => {
            const res = e;
            return (
              <View key={i} style={styles.tableRow}>
                <View
                  style={{
                    width: 20,
                    borderRight: 1,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                >
                  <Text style={{ fontSize: 10, paddingTop: 5, paddingLeft: 2 }}>
                    {i + 1}.
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{res.title}</Text>
                </View>
                <View
                  style={{
                    width: "5%",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                >
                  <Text style={styles.tableCell}>{res.quantity as number}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{res.address}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {dayjs(res.created_at).format("DD MMM YYYY")}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {formatRupiah(res.total as number)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 10, fontSize: 10 }}>
          <View>
            <Text
              style={{ textAlign: "right" }}
            >{`Total Penjualan :  ${formatRupiah(
              data?.reduce((a: any, b: any) => a + b.total, 0)
            )}`}</Text>
          </View>
        </View>
        <View style={{ marginTop: 60, fontSize: 10 }}>
          <View>
            <Text style={{ textAlign: "right" }}>{`Padang, ${dayjs(
              Date.now()
            ).format("DD MMM YYYY")}`}</Text>
            <Text style={{ textAlign: "right", marginTop: 10 }}>Admin</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
